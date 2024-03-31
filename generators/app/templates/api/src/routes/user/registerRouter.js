import Router from 'koa-router'

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
 * @response 500 - Internal Server Error
 * @responseComponent {InternalServerError} 500
 */
router.post('/', async (ctx) => {
  const user = { ...ctx.request.body }

  await ctx.orm.models.User.create(user)

  ctx.status = 201
})

export { router as registerRouter }
