import Generator from 'yeoman-generator'

export default class GeneratorSwagger extends Generator {
  writing() {
    this.fs.copy(this.templatePath('api/src'), this.destinationPath('api/src'))
  }
}
