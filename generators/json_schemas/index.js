import Generator from 'yeoman-generator'

export default class GeneratorJsonSchemas extends Generator {
  writing() {
    this.fs.copy(this.templatePath('api/src'), this.destinationPath('api/src'))
  }
}
