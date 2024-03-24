import Generator from 'yeoman-generator'

export default class GeneratorEslint extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('.prettierignore'),
      this.destinationPath('api/.prettierignore'),
    )
    this.fs.copy(
      this.templatePath('.prettierrc.json'),
      this.destinationPath('api/.prettierrc.json'),
    )
  }
}
