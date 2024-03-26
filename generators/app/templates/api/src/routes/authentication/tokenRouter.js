import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import config from '../../config/jwt.js'

const { JWTSecret, JWTAlgorithm } = config

/** @typedef {import('../../types/types.d.ts').Orm} Orm */

/**
 * Get user information from database
 *
 * @param {string} email User email
 * @param {string} password User password
 * @param {Orm} orm Orm object
 * @returns {Object} User information
 */
const getUserInfo = async (email, password, orm) => {
  const user = await orm.models.User.findOne({
    attributes: ['email', 'names', 'surnames'],
    where: {
      email,
      password,
    },
  })
  const userInfo = user.dataValues
  return userInfo
}

/** @type {import('koa').Middleware} */
const obtainToken = async (ctx) => {
  const { email, password } = ctx.request.body
  const userInfo = await getUserInfo(email, password, ctx.orm)
  const token = jwt.sign(userInfo, JWTSecret, { algorithm: JWTAlgorithm })
  ctx.status = 200
  ctx.body = {
    token,
  }
}

const router = new Router()

router.post('/', obtainToken)

export { router as tokenRouter }
