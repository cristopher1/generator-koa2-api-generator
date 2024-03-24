import Generator from 'yeoman-generator'

export default class GeneratorEslint extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('api/.husky/*'),
      this.destinationPath('api/.husky'),
    )
  }
}
