import Generator from 'yeoman-generator'

export default class GeneratorGit extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('api/_gitignore'),
      this.destinationPath('api/.gitignore'),
    )
  }
}
