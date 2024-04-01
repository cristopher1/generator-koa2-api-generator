import Generator from 'yeoman-generator'

export default class GeneratorSwagger extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(this.templatePath('api/src'), this.destinationPath('src'))
  }
}
