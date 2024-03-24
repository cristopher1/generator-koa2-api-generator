import Generator from 'yeoman-generator'

export default class GeneratorEslint extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('api/.prettierignore'),
      this.destinationPath('api/.prettierignore'),
    )
    this.fs.copy(
      this.templatePath('api/.prettierrc.json'),
      this.destinationPath('api/.prettierrc.json'),
    )
  }
}
