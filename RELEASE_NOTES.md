# Release notes

Yeoman generator that creates a base structure to create APIs in koa2 with sequelize and others tools.

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
    if (environment !== 'production') {
    router.use('/docs', swaggerRouter.routes())
    }
  - cd api and run npm uninstall openapi-comment-parser.
  - delete api-specification.yml
- If you do not want to use JSON Schemas.
  - Delete the api/src/schemas/json folder.
  - cd api and run npm uninstall ajv ajv-errors ajv-formats globs
  - Delete import { simpleJsonSchemaValidation } from '../../schemas/json/index.js' in api/src/routes/user/registerRouter.js, api/src/routes/user/router.js and api/src/routes/authentication/tokenRouter.js
