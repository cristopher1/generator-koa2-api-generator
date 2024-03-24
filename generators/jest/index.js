import Generator from 'yeoman-generator'

export default class GeneratorJset extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('__tests__'),
      this.destinationPath('api/__tests__'),
    )

    this.fs.copy(
      this.templatePath('jest.config.js'),
      this.destinationPath('api/jest.config.js'),
    )
  }
}
