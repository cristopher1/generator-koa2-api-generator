import Router from 'koa-router'
import { simpleJsonSchemaValidation } from '../../schemas/json/index.js'

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
router.put(
  '/',
  async (ctx, next) => {
    const { body } = ctx.request

    simpleJsonSchemaValidation('updatedUser', body)

    ctx.state.updatedUser = { ...body }
    await next()
  },
  async (ctx) => {
    const { email } = ctx.state.userInfo
    const { updatedUser } = ctx.state

    const user = await ctx.orm.models.User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      ctx.status = 404
      return
    }

    await user.update(updatedUser)

    ctx.status = 201
  },
)

export { router as userRouter }
