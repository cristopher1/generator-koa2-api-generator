import Generator from 'yeoman-generator'

export default class GeneratorDockerCompose extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('database/Dockerfile'),
      this.destinationPath('database/Dockerfile'),
      { image_database: 'new_project' },
    )
    this.fs.copy(
      this.templatePath('database/.env'),
      this.destinationPath('database/.env'),
    )
    this.fs.copyTpl(
      this.templatePath('docker-compose.yml'),
      this.destinationPath('docker-compose.yml'),
      { project_name: 'alallala' },
    )
  }
}
