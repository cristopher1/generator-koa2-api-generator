<h1 align="center">Welcome to generator-koa2-api-generator 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/cristopher1/generator-koa2-api-generator#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/cristopher1/generator-koa2-api-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/cristopher1/generator-koa2-api-generator/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/cristopher1/generator-koa2-api-generator" />
  </a>
</p>

> Yeoman generator to create a base structure for APIs based in koa2 framework, using tools such as: eslint, prettier, swagger and others

### What's changed? See [generator-koa2-api-generator releases](https://github.com/cristopher1/generator-koa2-api-generator/releases)

### 🏠 [Homepage](https://github.com/cristopher1/generator-koa2-api-generator)

Example of a generator created by `generator-koa2-api-generator`:

![generator-koa2-api-generator-project](https://github.com/cristopher1/generator-koa2-api-generator/assets/21159930/0b1a0512-b342-43da-94ef-9705d329a590)

### [Index](#index)

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Arguments and options](#arguments-and-options)
- [Generators included](#generators-included)
- [The configuration files](#configuration-files)
- [The question: Do you want to automatically run the scripts that configure the package, then installing the dependencies?](#configuring-the-project-automatically)
- [The scripts in package.json](#scripts)
- [Getting To Know Yeoman](#know-yeoman)
- [Author](#author)
- [Contributing](#contributing)
- [Show your support](#support)
- [License](#license)

## <a id="installation"></a> Installation

First, install [Yeoman](http://yeoman.io) and generator-koa2-api-generator using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-koa2-api-generator
```

Then generate your new project:

```bash
yo koa2-api-generator project_name
```

## <a id="prerequisites"></a> Prerequisites

First, you must create a folder, then you enter it using the terminal. Finally you runs.

```bash
yo koa2-api-generator project_name
```

Example:

```console
PS C:\Users\...\new_koa2_api_project> yo koa2-api-generator project_name
```

## <a id="arguments-and-options"></a> Arguments and options

The generator-koa2-api-generator include two arguments called **projectName** and **databaseDriver**. **projectName** is a required argument:

For example: If you want to create a new koa2 api called koa2_api_project (projectName = koa2_api_project) with postgresql plugin, you should use:

```bash
yo koa2-api-generator koa2_api_project postgresql
```

The generator-koa2-api-generator include various options, these are:

| option               |  value  |  default   | description                                                                                                                   | example                                                                                  |
| :------------------- | :-----: | :--------: | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| runGitInit           | Boolean |   false    | Run git init automatically, then installing the dependencies                                                                  | `yo koa2-api-generator project_name --runGitInit`                                     |
| runPackageScripts    | Boolean |   false    | Run the scripts that configure the package, then installing the dependencies                                                  | `yo koa2-api-generator project_name --runPackageScripts`                              |
| useDocker            | Boolean |     false     | Add docker support using DockerFile, .dockerignore and others                                                              | `yo koa2-api-generator project_name --useDocker`               |
| nodeVersion          | Number  |     without default value     | Node version used in DockerFile. (FROM nodeVersion). Recommended to use node 16, 18, 20 or 21              | `yo koa2-api-generator project_name --nodeVersion=21`   |
| projectFolderName    | String  | api | Project folder name used in DockerFile. (WORKDIR /usr/src/projectFolderName) | `yo koa2-api-generator project_name --projectFolderName=project_folder_name`                                    |
| useDockerCompose     | String  |     false     | Add Docker Compose support.                                                                                                | `yo koa2-api-generator project_name --useDockerCompose`                              |
| databaseName         | String  |     null     | Select the database to which the application will connect.                                                                  | `yo koa2-api-generator project_name --databaseName=postgresql`                   |

## <a id="structure"></a> Project structure

The project generated by generator-koa2-api-generator includes:

* **api (folder)**: In this folder there are project configurations and the src folder that contains the source code

  * **.husky (folder)**: Contains git hook used by husky
  * **.env (file)**: Contains the API environment variables.
  * **.env.example (file)**: Contains an example of API environment variables used to create a .env file.
  * **.eslintignore (file)**: Files and folders ignored by eslint.
  * **.eslintrc.yml (file)**: Configuration used by eslint.
  * **.gitignore (file)**: Files ignored by git.
  * **.lintstagedrc.json (file)**: Configuration used by lintstaged.
  * **.prettierignore (file)**: Files and folders ignored by prettier.
  * **.prettierrc.json (file)**: Configuration used by prettier.
  * **.sequelizerc (file)**: Configuration used by sequelize-cli.
  * **api-specification (file)**: Contains specification used by openapi-comment-parser.
  * **babel.config.json (file)**: Configuration used by babel. In this case babel-register (.sequelizerc).
  * **commitlint.config.js (file)**: Congiguration used by commitlint.
  * **package.json (file)**: Contains dependencies, dev dependencies, scripts, etc.
  * **README.md (file)**: Documentation generated by generator-koa2-api-generator.
  * **src (folder)**: Contains the source code:
    * **config (folder)**: Contains configuration files, for example database.js (contains environment varibles used by sequelize), jwt.js (contains environment variables used by jsonwebtoken) and openapi.js (contains the configuration used by openapi-comment-parser).
    * **db (folder)**: Contains folders used by sequelize.
      * **migrations (folder)**: This folder contains CommonJS Modules (files with extension .cjs and use require/module.exports). Includes a default user migration.
      * **models (folder)**: This folder contains ES Modules (by default the project generated by generator-koa2-api-generator uses ES Modules, files with extension .js and use import/export). Includes a default user model.
        The index.js file loads the models exporting the orm constant.
      * **seeders (folder)**: This folder contains CommonJS Modules (files with extension .cjs and use require/module.exports).
    * **routes (folder)**: Contains the koa routers used by the project.
      * **authentication (folder)**: Contains functions and routers to authenticate the users with json web token.
      * **swagger (folder)**: Contains functions and routes to create documentation using swagger.
      * **user (folder)**: Contains functions and routes to register, obtain and modify an user. Uses default model user
      * **index.js (file)**: Contains the main koa2 router with prefix 'api/v1' and mounts the others routers.
    * **schemas (folder)**: Contains openapi schemas and json schemas.
      * **json (folder)**: Contains json schemas.
        * **index.js**: Loads the json schemas using ajv, ajv-errors and ajv-formats. Exports the jsonSchema constant and the simpleJsonSchemaValidation function, the json schemas file should have the file name : 'name_of_json_schema.json' and they can be saved in subfolders within the json folder.
      * **openapi (folder)**: Contains openapi schemas. The files in this folder have the .yml extension and they can have any name, for example: 'my_new_openapi_schema.yml'.
        * **default_response (folder)**: Contains openapi schemas for koa2 default response (200, 201, 401, 404, 500).
        * **json_web_token (folder)**: Contains openapi schemas for token (json web token) and create token.
        * **secutiry (folder)**: Contains openapi schema for authentication with bearer token.
        * **user (folder)**: Contains openapi schema for user.
    * **types.d.ts (file)**: Includes any types used by the project, for example type Orm, JsonSchema, Module augmentation (Koa), etc. You can call the Orm/JsonSchema/others type using jsdoc, for example:  /** @type {import('route/to/typesfolder/types.d.ts').Orm} */
    * **api.js (file)**: Creates and configures the Koa object and it exports the Koa object.
    * **server.js (file)**: Mounts the API and runs the server.

## <a id="generators-included"></a> Generators included

The generators included are:

`koa2-api-generator:app` used by `yo koa2-api-generator`: It is the generator used by default.

`koa2-api-generator:docker`: It is used to add support for Docker. It accepts the options `--useDocker`, `--nodeVersion` and `--projectFolderName`.

`koa2-api-generator:docker_compose`: It is used to add support for Docker Compose. It accepts the options `--useDockerCompose` and `--databaseName`.

## <a id="configuring-the-project-automatically"></a> The question: Do you want to automatically run the scripts that configure the package, then installing the dependencies?

When you selects the true value, the following scripts ubicated in the package.json are executed:

- `init`
- `format:fix`

If you selects the false value, if you want to use husky, you must run `npm run init`.

## <a id="scripts"></a> The scripts in package.json

The more important scripts added into the package.json created by this generator are:

- `"init"`: Runs the commands necessary to initialize the package, for example `init:husky`.
- `"dev"`: Runs the application in development mode using nodemon and dotenv.
- `"start"`: Runs the application using node.
- `"format"`: Checks the format using prettier.
- `"format:fix"`: Fixes the format using prettier.
- `"lint"`: static code analysis using eslint.
- `"lint:fix"`: Fixes the code using eslint.
- `"commitlint"`: Runs commitlint. It is used into .husky/commit-msg file. It is called by the commit-msg hook. See [git hook](https://www.atlassian.com/git/tutorials/git-hooks#:~:text=The%20commit%2Dmsg%20hook%20is,file%20that%20contains%20the%20message.).
- `"lint-staged"`: Runs lint-staged. It is used into .husky/pre-commit file. It is called by the pre-commit hook. See [git hook](https://www.atlassian.com/git/tutorials/git-hooks#:~:text=The%20commit%2Dmsg%20hook%20is,file%20that%20contains%20the%20message.).
- `"quality-check"`: Runs `npm run format && npm run lint`. It is used into .husky/pre-push file. It is called by the pre-push hook See [git hook](https://www.atlassian.com/git/tutorials/git-hooks#:~:text=The%20commit%2Dmsg%20hook%20is,file%20that%20contains%20the%20message.).

## <a id="know-yeoman"></a> Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## <a id="author"></a> Author Author

👤 **Cristopher Jiménez Meza**

- Github: [@cristopher1](https://github.com/cristopher1)

## <a id="contributing"></a> 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/cristopher1/generator-koa2-api-generator/issues). You can also take a look at the [contributing guide](https://github.com/cristopher1/generator-koa2-api-generator/blob/master/CONTRIBUTING.md).

## <a id="support"></a> Show your support

Give a ⭐️ if this project helped you!

## <a id="license"></a> 📝 License

Copyright © 2024 [Cristopher Jiménez Meza](https://github.com/cristopher1).<br />
This project is [MIT](https://github.com/cristopher1/generator-koa2-api-generator/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
