# Release notes

Yeoman generator that creates a base structure to create APIs in koa2 with sequelize and others tools.

**Feature added in version 1.0.2:**

- README updated
- DATABASE_URL added in .env and .env.example
- Fixed the problem associated with the option "Do not select any" in the question and generator options "Select the database to which the application will connect". Now a docker-compose.yml without database service is created.

**Feature added in version 1.0.1:**

- Removed @babel/plugin-transform-runtime from api/babel.config.json
- Adds in documentation default value for nodeVersion in docker generator (node version 16)

**Features added in version 1.0.0:**

- generator-koa2-api-generator only include configurations for development environment.
- Adds configurations for commitlint, prettier, swagger, husky, openapi, sequelize, jsonwebtoken and other tools.
- Installs database drivers ans create Docker Compose configuration for postgresql, mysql and mariadb.
- Adds docker support.
- Adds docker compose support.
- Include dotenv and openapi-comment-parser in dev dependencies.
- Include ajv, ajv-errors and ajv-formats to use JSON Schemas.
- Include globs and jsonwebtoken in dependencies.
- If you do not want to use openapi.
  - Delete the api/src/schemas/openapi folder.
  - Delete the api/src/config/openapi.js file.
  - Delete the api/src/routes/swagger folder.
  - In the api/src/routes/index.js file, delete:
    ```node
    if (environment !== 'production') {
      router.use('/docs', swaggerRouter.routes())
    }
    ```
  - In terminal use:
    ```sh
      cd api
      npm uninstall openapi-comment-parser
    ```
  - delete api-specification.yml
  - Remove the openapi comment in the files in api/src/routes, for example:
    ```node
      /**
        * GET /api/v1/users/{userEmail}
        *
        * @tag API endpoints
        * @security BearerAuth
        * @summary Get an user by email
        * @pathParam {string} userEmail
        * @response 200 - Ok
        * @responseContent {User} 200.application/json
        * @response 401 - Unauthorized
        * @responseComponent {Unauthorized} 401
        * @response 404 - Not found
        * @responseComponent {NotFound} 404
        * @response 500 - Internal Server Error
        * @responseComponent {InternalServerError} 500
      */
      router.get('/:userEmail', async (ctx) => {
    ```
    This comment begin with GET, POST, PUT or others HTTP Verb.
- If you do not want to use JSON Schemas.
  - Delete the api/src/schemas/json folder.
  - In terminal use:
    ```sh
      cd api
      npm uninstall ajv ajv-errors ajv-formats globs
    ```
  - Delete in files api/src/routes/user/registerRouter.js, api/src/routes/user/router.js and api/src/routes/authentication/tokenRouter.js
    ```node
    import { simpleJsonSchemaValidation } from '../../schemas/json/index.js'
    ```
