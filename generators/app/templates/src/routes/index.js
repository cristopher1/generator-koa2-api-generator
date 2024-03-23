import Router from 'koa-router'
import { tokenRouter } from './authentication/tokenRouter.js'
import { authenticationRouter } from './authentication/authenticationRouter.js'
import { registerRouter } from './user/registerRouter.js'
import { userRouter } from './user/router.js'
import { swaggerRouter } from './swagger/router.js'

const environment = process.env.NODE_ENV || 'development'

const router = new Router({
  prefix: '/api/v1',
})

if (environment !== 'production') {
  router.use('/docs', swaggerRouter.routes())
}
router.use('/users/register', registerRouter.routes())
router.use('/tokens', tokenRouter.routes())
router.use(authenticationRouter.routes())
router.use('/users', userRouter.routes())

export { router as apiRouter }
