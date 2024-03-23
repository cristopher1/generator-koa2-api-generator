import Generator from 'yeoman-generator'

export default class GeneratorSequelize extends Generator {
  writing() {
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'))
    this.fs.copy(
      this.templatePath('.sequelizerc'),
      this.destinationPath('.sequelizerc'),
    )
  }
}
