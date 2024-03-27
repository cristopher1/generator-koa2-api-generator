import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { faker } from './helpers'
import { beforeAll } from '@jest/globals'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('generator-koa2-api-generator:app', () => {
  describe('create a project', () => {
    const projectName = 0
    const args = []
    const answers = {}

    beforeAll(async () => {
      args[projectName] = faker.string.sample()

      /**
       * Add options to withAnswers, for example: Use a callback function to
       * trigger filter functions used in question objects.
       */
      const options = {
        /**
         * This function is called by withAnswers for each answer.
         *
         * @param {any} answer User entered answer.
         * @param {Object} param
         * @param {any} param.question The question associated with the answer.
         * @param {any} param.answers All user entered answers.
         * @returns
         */
        callback: (answer, { question, answers }) =>
          question.filter ? question.filter(answer) : answer,
      }

      await helpers
        .run(path.join(__dirname, '../generators/app'))
        .withArguments(args)
        .withAnswers(answers, options)
    })

    it('Should create a server.js file', () => {
      // Assert
      assert.file('api/src/server.js')
    })
  })
})
