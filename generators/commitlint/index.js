import Generator from 'yeoman-generator'

export default class GeneratorCommitLint extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(
      this.templatePath('api/commitlint.config.js'),
      this.destinationPath('commitlint.config.js'),
    )
  }
}
