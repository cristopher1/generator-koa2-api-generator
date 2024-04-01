import Generator from 'yeoman-generator'

export default class GeneratorSequelize extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(this.templatePath('api/src'), this.destinationPath('src'))
    this.fs.copy(
      this.templatePath('api/src/db/seeders/.keep'),
      this.destinationPath('src/db/seeders/.keep'),
    )
    this.fs.copy(
      this.templatePath('api/.sequelizerc'),
      this.destinationPath('.sequelizerc'),
    )
  }
}
