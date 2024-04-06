import Koa from 'koa'
import koaBody from 'koa-body'
import override from 'koa-override-method'
import bearerToken from 'koa-bearer-token'
import logger from 'koa-logger'
import { orm } from './db/models/index.js'
import { apiRouter } from './routes/index.js'
import { ValidationError } from 'sequelize'
import { RequestValidationError } from './schemas/json/index.js'

// Api constructor
const api = new Koa()

api.context.orm = orm

// error handler
api.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (
      err instanceof ValidationError ||
      err instanceof RequestValidationError
    ) {
      ctx.status = 400
      ctx.body = {
        errors: err.errors,
      }
      return
    }
    ctx.response.status = 500
    console.error(err.message)
  }
})

api.use(logger())

api.use(bearerToken())

// parse request body
api.use(
  koaBody({
    multipart: true,
    keepExtensions: true,
  }),
)

api.use((ctx, next) => {
  ctx.request.method = override.call(
    ctx,
    ctx.request.body.fields || ctx.request.body,
  )
  return next()
})

// Routing middleware
api.use(apiRouter.routes())

export default api
