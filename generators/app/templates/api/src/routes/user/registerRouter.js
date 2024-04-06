import Router from 'koa-router'
import { simpleJsonSchemaValidation } from '../../schemas/json/index.js'

const router = new Router()

/**
 * POST /api/v1/users/register
 *
 * @tag API endpoints
 * @summary Register an user
 * @bodyContent {NewUser} application/json
 * @bodyRequired
 * @response 201 - Created
 * @responseComponent {Created} 201
 * @response 400 - Bad request
 * @responseExample {NewUserBadRequestDetectedByJsonSchema} 400.application/json.NewUserBadRequestDetectedByJsonSchema
 * @responseExample {NewUserBadRequestDetectedBySequelizeValidation} 400.application/json.NewUserBadRequestDetectedBySequelizeValidation
 * @response 500 - Internal Server Error
 * @responseComponent {InternalServerError} 500
 */
router.post(
  '/',
  // Validate the request using JSON Schema
  async (ctx, next) => {
    const { body } = ctx.request

    simpleJsonSchemaValidation('newUser', body)

    ctx.state.user = { ...body }
    await next()
  },
  async (ctx) => {
    const { user } = ctx.state

    await ctx.orm.models.User.create(user)

    ctx.status = 201
  },
)

export { router as registerRouter }
