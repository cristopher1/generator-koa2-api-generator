import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'
import { GeneratorProvider } from './generator_components/GeneratorProvider.js'

export default class GeneratorKoa2ApiGenerator extends Generator {
  #answers
  #generatorProvider

  constructor(args, opts) {
    super(args, opts)

    this.argument('projectName', {
      type: String,
      description: 'Name of the generator',
      required: true,
    })
  }

  initializing() {
    this.#generatorProvider = new GeneratorProvider()
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the glorious ${chalk.red(
          'generator-koa2-api-generator',
        )} generator!`,
      ),
    )

    this.#answers = {
      projectName: this.options.projectName,
    }
  }

  #addGit() {
    const generator = this.#generatorProvider.getGitGenerator()
    this.composeWith(generator)
  }

  #addEslint() {
    const generator = this.#generatorProvider.getEslintGenerator()
    this.composeWith(generator)
  }

  #addHusky() {
    const generator = this.#generatorProvider.getHuskyGenerator()
    this.composeWith(generator)
  }

  #addLintStaged() {
    const generator = this.#generatorProvider.getLintStagedGenerator()
    this.composeWith(generator)
  }

  #addPrettier() {
    const generator = this.#generatorProvider.getPrettierGenerator()
    this.composeWith(generator)
  }

  #addBabel() {
    const generator = this.#generatorProvider.getBabelGenerator()
    this.composeWith(generator)
  }

  #addJest(args) {
    const generator = this.#generatorProvider.getJestGenerator()
    this.composeWith(generator, args)
  }

  #addCommitLint() {
    const generator = this.#generatorProvider.getCommitLintGenerator()
    this.composeWith(generator)
  }

  #addDocker() {
    const generator = this.#generatorProvider.getDockerGenerator()
    this.composeWith(generator)
  }

  #addDockerCompose() {
    const generator = this.#generatorProvider.getDockerComposeGenerator()
    this.composeWith(generator)
  }

  #addJsonSchemas() {
    const generator = this.#generatorProvider.getJsonSchemasGenerator()
    this.composeWith(generator)
  }

  #addOpenApi(args) {
    const generator = this.#generatorProvider.getOpenApiGenerator()
    this.composeWith(generator, args)
  }

  #addSwagger() {
    const generator = this.#generatorProvider.getSwaggerGenerator()
    this.composeWith(generator)
  }

  #addSequelize() {
    const generator = this.#generatorProvider.getSequelizeGenerator()
    this.composeWith(generator)
  }

  configuring() {
    const { projectName } = this.#answers

    this.#addGit()
    this.#addEslint()
    this.#addHusky()
    this.#addLintStaged()
    this.#addPrettier()
    this.#addBabel()
    this.#addJest()
    this.#addCommitLint()
    this.#addSequelize()
    this.#addOpenApi([projectName])
    this.#addSwagger()
    this.#addDocker()
    this.#addDockerCompose()
    this.#addJsonSchemas()
  }

  writing() {
    this.fs.copy(this.templatePath('api/src'), this.destinationPath('api/src'))
    this.fs.copy(
      this.templatePath('api/.env.example'),
      this.destinationPath('api/.env.example'),
    )
    this.fs.copy(
      this.templatePath('api/.env'),
      this.destinationPath('api/.env'),
    )
    this.fs.copy(
      this.templatePath('api/package.json'),
      this.destinationPath('api/package.json'),
    )
  }

  #runGoodBye() {
    this.log('\n')
    this.log('****************************************************')
    this.log('****************************************************')
    this.log('********                                    ********')
    this.log('******    Thanks for to use this generator    ******')
    this.log('****                                            ****')
    this.log('******     The project structure is ready     ******')
    this.log('********                                    ********')
    this.log('****************************************************')
    this.log('****************************************************')
    this.log('\n')
  }

  end() {
    this.#runGoodBye()
  }
}
