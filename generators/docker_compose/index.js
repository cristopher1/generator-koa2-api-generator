import Generator from 'yeoman-generator'

export default class GeneratorDockerCompose extends Generator {
  #answers
  #databaseService = {}
  #apiEnvironmentVariables = {}
  #databaseEnvironmentVariables = ''

  constructor(args, opts) {
    super(args, opts)

    this.argument('useDockerCompose', {
      type: Boolean,
      description: 'Add Docker Compose support.',
      required: false,
    })
    this.argument('databaseName', {
      type: String,
      description: 'Select the database to which the application will connect.',
      required: false,
    })
  }

  async prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'useDockerCompose',
        message: 'Add Docker Compose support.',
        when: () => !this.options.useDockerCompose,
        choices: [
          {
            name: 'yes',
            value: true,
          },
          {
            name: 'no',
            value: false,
          },
        ],
      },
      {
        type: 'list',
        name: 'databaseName',
        message: 'Select the database to which the application will connect.',
        when: (answers) =>
          (this.options.useDockerCompose || answers.useDockerCompose) &&
          !this.options.databaseName,
        choices: [
          {
            name: 'MySQL',
            value: 'mysql',
          },
          {
            name: 'PostgreSQL',
            value: 'postgresql',
          },
          {
            name: 'MariaDB',
            value: 'mariadb',
          },
          {
            name: 'Do not select any',
            value: null,
          },
        ],
        default: 'postgresql',
      },
    ]

    const answers = await this.prompt(prompts)

    this.#answers = {
      useDockerCompose:
        this.options.useDockerCompose || answers.useDockerCompose,
      databaseName: this.options.databaseName || answers.databaseName,
    }
  }

  configuring() {
    const { useDockerCompose, databaseName } = this.#answers

    if (useDockerCompose) {
      switch (databaseName) {
        case 'mysql':
          this.#databaseService = {
            image: 'mysql',
            volumenMapped: '\n      - mysql_data:/var/lib/mysql',
            volumen: '\n  mysql_data:',
          }
          this.#apiEnvironmentVariables = {
            dbPort: 3306,
            dbDialect: 'mysql',
          }
          this.#databaseEnvironmentVariables =
            'MYSQL_ROOT_PASSWORD=admin\nMYSQL_USER=admin\nMYSQL_PASSWORD=admin\n MYSQL_DATABASE=api\n'
          break
        case 'mariadb':
          this.#databaseService = {
            image: 'mariadb',
            volumenMapped:
              '\n      - maria_db_data:/var/lib/mysql\n      - maria_db_backup:/backup',
            volumen: '\n  maria_db_data:\n  maria_db_backup:',
          }
          this.#apiEnvironmentVariables = {
            dbPort: 3306,
            dbDialect: 'mariadb',
          }
          this.#databaseEnvironmentVariables =
            'MARIADB_ROOT_PASSWORD=admin\nMARIADB_USER=admin\nMARIADB_PASSWORD=admin\nMARIADB_DATABASE=api\n'
          break
        default:
          this.#databaseService = {
            image: 'postgres',
            volumenMapped: '\n      - pg_data:/var/lib/postgresql/data',
            volumen: '\n  pg_data:',
          }
          this.#apiEnvironmentVariables = {
            dbPort: 5432,
            dbDialect: 'postgres',
          }
          this.#databaseEnvironmentVariables =
            'POSTGRES_USER=admin\nPOSTGRES_PASSWORD=admin\nPOSTGRES_DB=api\n'
          break
      }
    }
  }

  writing() {
    const { useDockerCompose } = this.#answers

    if (useDockerCompose) {
      const databaseEnvironmentVariables = this.#databaseEnvironmentVariables
      const { dbPort, dbDialect } = this.#apiEnvironmentVariables
      const { image, volumenMapped, volumen } = this.#databaseService

      this.fs.copyTpl(
        this.templatePath('databases/.env'),
        this.destinationPath('database/.env'),
        {
          environmentVariables: databaseEnvironmentVariables,
        },
      )
      this.fs.copyTpl(
        this.templatePath('databases/.env.example'),
        this.destinationPath('database/.env.example'),
        {
          environmentVariables: databaseEnvironmentVariables,
        },
      )
      this.fs.copyTpl(
        this.templatePath('databases/Dockerfile'),
        this.destinationPath('database/Dockerfile'),
        {
          databaseImage: image,
        },
      )
      this.fs.copy(this.templatePath('.env'), this.destinationPath('.env'))
      this.fs.copy(
        this.templatePath('.env.example'),
        this.destinationPath('.env.example'),
      )
      this.fs.copyTpl(
        this.templatePath(`docker-compose.yml`),
        this.destinationPath('docker-compose.yml'),
        {
          databaseVolumenMapped: volumenMapped,
          databaseVolumen: volumen,
        },
      )

      const databaseEnvVariablesForApi = [
        {
          name: 'DB_USERNAME',
          value: 'admin',
        },
        {
          name: 'DB_PASSWORD',
          value: 'admin',
        },
        {
          name: 'DB_NAME',
          value: 'api',
        },
        {
          name: 'DB_HOST',
          value: 'database',
        },
        {
          name: 'DB_PORT',
          value: `${dbPort}`,
        },
        {
          name: 'DB_DIALECT',
          value: `${dbDialect}`,
        },
      ]

      let envFile = this.fs.read(this.destinationPath('api/.env'))

      for (const databaseEnvVariableForApi of databaseEnvVariablesForApi) {
        const name = databaseEnvVariableForApi.name
        const value = databaseEnvVariableForApi.value

        envFile = envFile.replace(`${name}=`, `${name}=${value}`)
      }

      this.fs.write(this.destinationPath('api/.env'), envFile)
    }
  }
}
