import Generator from 'yeoman-generator'

export default class GeneratorDockerCompose extends Generator {
  #answers

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

  writing() {
    const { useDockerCompose, databaseName } = this.#answers

    if (useDockerCompose && databaseName) {
      this.fs.copy(
        this.templatePath(`databases/${databaseName}/database`),
        this.destinationPath('database'),
      )
      this.fs.copy(
        this.templatePath(`databases/${databaseName}/database/.env`),
        this.destinationPath('database/.env'),
      )
      this.fs.copy(
        this.templatePath(`databases/${databaseName}/docker-compose.yml`),
        this.destinationPath('docker-compose.yml'),
      )

      let dbPort
      let dbDialect

      switch (databaseName) {
        case 'mysql':
          dbPort = 3306
          dbDialect = 'mysql'
          break
        case 'mariadb':
          dbPort = 3306
          dbDialect = 'mariadb'
          break
        default:
          dbPort = 5432
          dbDialect = 'postgres'
          break
      }

      const databaseEnvVariables = [
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

      for (const databaseEnvVariable of databaseEnvVariables) {
        const name = databaseEnvVariable.name
        const value = databaseEnvVariable.value

        envFile = envFile.replace(`${name}=`, `${name}=${value}`)
      }

      this.fs.write(this.destinationPath('api/.env'), envFile)
    }
  }
}
