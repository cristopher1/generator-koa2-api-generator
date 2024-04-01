import Generator from 'yeoman-generator'

export default class GeneratorEslint extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(
      this.templatePath('api/.husky/*'),
      this.destinationPath('.husky'),
    )
  }
}
