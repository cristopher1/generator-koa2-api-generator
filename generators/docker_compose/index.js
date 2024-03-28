import Generator from 'yeoman-generator'

export default class GeneratorDockerCompose extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('databaseName', { type: String, required: false })
  }

  writing() {
    const databaseName = this.options.databaseName || 'mysql'

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
