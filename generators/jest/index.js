import Generator from 'yeoman-generator'

export default class GeneratorJset extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('api/__tests__'),
      this.destinationPath('api/__tests__'),
    )

    this.fs.copy(
      this.templatePath('api/jest.config.js'),
      this.destinationPath('api/jest.config.js'),
    )
  }
}
