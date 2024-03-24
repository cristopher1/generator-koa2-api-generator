import Generator from 'yeoman-generator'

export default class GeneratorSwagger extends Generator {
  writing() {
    this.fs.copy(this.templatePath('src'), this.destinationPath('api/src'))
  }
}
