import Generator from 'yeoman-generator'

export default class GeneratorJset extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('__tests__/helpers/index.js'),
      this.destinationPath('__tests__/helpers/index.js'),
    )

    this.fs.copy(
      this.templatePath('__tests__/index.test.js'),
      this.destinationPath('__tests__/index.test.js'),
    )

    this.fs.copy(
      this.templatePath('jest.config.js'),
      this.destinationPath('jest.config.js'),
    )
  }
}
