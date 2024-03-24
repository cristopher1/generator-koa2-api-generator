import Generator from 'yeoman-generator'

export default class GeneratorEslint extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('api/.eslintignore'),
    )
    this.fs.copy(
      this.templatePath('.eslintrc.yml'),
      this.destinationPath('api/.eslintrc.yml'),
    )
  }
}
