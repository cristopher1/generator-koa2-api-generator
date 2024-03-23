import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Sequelize } from 'sequelize'
import config from '../../config/database.js'

/** @typedef {import('sequelize').DataTypes} DataTypes */
/** @typedef {import('sequelize').Sequelize} Sequelize */
/**
 * @typedef {object} Orm
 * @property {object} db - Object that contains Sequelize class and sequelize
 *   connection to database.
 * @property {object} models - Object that contains the sequelize models.
 */

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const basename = path.basename(filename)

let sequelize
if (config.urlConnection) {
  sequelize = new Sequelize(config.urlConnection)
} else {
  const { database, username, password, host, port, dialect } = config
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
  })
}

/**
 * Get the name of all files ubicated in models directory.
 *
 * @param {string} dirname The dirname were index.js file is ubicated
 * @param {string} basename The name of the index.js file
 * @returns {string[]} The name of all files ubicated in models directory, these
 *   files contains Sequelize models.
 */
const getModelFileNames = (dirname, basename) => {
  const modelFileNames = fs.readdirSync(dirname).filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })
  return modelFileNames
}

/**
 * @param {string} dirname The dirname were index.js file is ubicated
 * @param {string} basename The name of the index.js file
 * @param {Sequelize} sequelize The sequelize object used to connect to the
 *   database
 * @param {DataTypes} sequelizeDataTypes The data types used by sequelize models
 */
const loadOrm = async (dirname, basename, sequelize, sequelizeDataTypes) => {
  const orm = {}

  orm.db = {}
  orm.models = {}

  const modelFileNames = getModelFileNames(dirname, basename)

  for (const file of modelFileNames) {
    const filePath = path.join(dirname, file)
    const fileUrl = path.resolve(filePath)
    const { default: buildModel } = await import(fileUrl)
    const model = buildModel(sequelize, sequelizeDataTypes)
    orm.models[model.name] = model
  }

  Object.keys(orm.models).forEach((modelName) => {
    if (orm.models[modelName].associate) {
      orm.models[modelName].associate(orm.models)
    }
  })

  orm.db.sequelize = sequelize
  orm.db.Sequelize = Sequelize

  return orm
}

export default loadOrm(dirname, basename, sequelize, Sequelize.DataTypes)
