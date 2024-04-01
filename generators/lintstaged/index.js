import Generator from 'yeoman-generator'

export default class GeneratorLintStaged extends Generator {
  writing() {
    this.env.cwd = this.destinationPath('api')

    this.fs.copy(
      this.templatePath('api/.lintstagedrc.json'),
      this.destinationPath('.lintstagedrc.json'),
    )
  }
}
