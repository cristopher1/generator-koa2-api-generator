import openapi from 'openapi-comment-parser'
import { koaSwagger } from 'koa2-swagger-ui'
import Router from 'koa-router'
import config from '../../config/openapi.js'

const router = new Router()

const openApiSpecification = openapi(config)

const swagger = koaSwagger({
  swaggerOptions: {
    spec: openApiSpecification,
  },
})

router.get('/', swagger)

export { router as swaggerRouter }
