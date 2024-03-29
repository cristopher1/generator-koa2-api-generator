import Router from 'koa-router'

const router = new Router()

/**
 * GET /api/v1/users/{userEmail}
 *
 * @tag API endpoints
 * @security BearerTokenAuth
 * @summary Get an user by email
 * @pathParam {string} userEmail
 * @response 200 - Ok
 * @responseContent {User} 200.application/json
 * @response 400 - Bad request
 * @response 401 - The client is not authorized
 * @response 500 - Unexpected error
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
 * @security BearerTokenAuth
 * @summary Update user data
 * @bodyContent {UpdateUser} application/json
 * @bodyRequired
 * @response 200 - Ok
 * @response 400 - Bad request
 * @response 401 - The client is not authorized
 * @response 500 - Unexpected error
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
