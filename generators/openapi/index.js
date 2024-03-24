import Generator from 'yeoman-generator'

export default class GeneratorOpenApi extends Generator {
  writing() {
    this.fs.copy(this.templatePath('src'), this.destinationPath('api/src'))
    this.fs.copy(
      this.templatePath('api-specification.yml'),
      this.destinationPath('api/api-specification.yml'),
    )
  }
}
