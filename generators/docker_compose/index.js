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
        ],
        default: 'postgresql',
      },
    ]

    const answers = await this.prompt(prompts)

    this.#answers = {
      useDockerCompose:
        this.options.useDockerCompose || answers.useDockerCompose || false,
      databaseName:
        this.options.databaseName || answers.databaseName || 'postgresql',
    }
  }

  writing() {
    const { useDockerCompose, databaseName } = this.#answers

    if (useDockerCompose) {
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
    }
  }
}
