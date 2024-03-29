import Generator from 'yeoman-generator'

export default class GeneratorOpenApi extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('projectName', {
      type: String,
      description: 'Name of the generator',
      required: true,
    })
  }

  writing() {
    const { projectName } = this.options

    this.fs.copy(this.templatePath('api/src'), this.destinationPath('api/src'))
    this.fs.copyTpl(
      this.templatePath('api/api-specification.yml'),
      this.destinationPath('api/api-specification.yml'),
      {
        projectName,
      },
    )
  }
}
