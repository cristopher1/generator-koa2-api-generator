import Generator from 'yeoman-generator'

export default class GeneratorOpenApi extends Generator {
  writing() {
    this.fs.copy(this.templatePath('api/src'), this.destinationPath('api/src'))
    this.fs.copy(
      this.templatePath('api/api-specification.yml'),
      this.destinationPath('api/api-specification.yml'),
    )
  }
}
