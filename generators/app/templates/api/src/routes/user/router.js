import Router from 'koa-router'

const router = new Router()

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

  ctx.status = 200
  ctx.body = {
    user,
  }
})

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
