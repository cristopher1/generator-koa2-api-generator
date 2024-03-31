import Router from 'koa-router'

const router = new Router()

/**
 * GET /api/v1/users/{userEmail}
 *
 * @tag API endpoints
 * @security BearerAuth
 * @summary Get an user by email
 * @pathParam {string} userEmail
 * @response 200 - Ok
 * @responseContent {User} 200.application/json
 * @response 400 - Bad request
 * @response 401 - Unauthorized
 * @responseComponent {Unauthorized} 401
 * @response 404 - Not found
 * @responseComponent {NotFound} 404
 * @response 500 - Internal Server Error
 * @responseComponent {InternalServerError} 500
 */
router.get('/:userEmail', async (ctx) => {
  const { userEmail } = ctx.params

  const user = await ctx.orm.models.User.findOne({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    ctx.status = 404
    return
  }

  const { email, names, surnames } = user

  ctx.status = 200
  ctx.body = {
    email,
    names,
    surnames,
  }
})

/**
 * PUT /api/v1/users/
 *
 * @tag API endpoints
 * @security BearerAuth
 * @summary Update user data
 * @bodyContent {UpdatedUser} application/json
 * @bodyRequired
 * @response 200 - Ok
 * @responseComponent {Ok} 200
 * @response 400 - Bad request
 * @responseExample {UpdatedUserBadRequestDetectedByJsonSchema} 400.application/json.UpdatedUserBadRequestDetectedByJsonSchema
 * @response 401 - Unauthorized
 * @responseComponent {Unauthorized} 401
 * @response 500 - Internal Server Error
 * @responseComponent {InternalServerError} 500
 */
router.put('/', async (ctx) => {
  const { email } = ctx.state.userInfo
  const newUserInfo = { ...ctx.request.body }

  const user = await ctx.orm.models.User.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    ctx.status = 404
    return
  }

  await user.update(newUserInfo)

  ctx.status = 201
})

export { router as userRouter }
