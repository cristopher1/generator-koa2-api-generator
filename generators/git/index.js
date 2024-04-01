import Generator from 'yeoman-generator'

export default class GeneratorGit extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(
      this.templatePath('api/_gitignore'),
      this.destinationPath('.gitignore'),
    )
  }
}
