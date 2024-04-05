import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'
import { GeneratorProvider } from './generator_components/GeneratorProvider.js'
import { DataProcessor } from '../lib/index.js'

export default class GeneratorKoa2ApiGenerator extends Generator {
  #answers
  #generatorProvider

  constructor(args, opts) {
    super(args, opts)

    this.argument('projectName', {
      type: String,
      description: 'Name of the project',
      required: true,
    })

    this.argument('databaseName', {
      type: String,
      description: 'Select a database driver.',
      required: false,
    })

    this.option('runPackageScripts', {
      type: Boolean,
      description:
        'Do you want to automatically run the scripts that configure the project, then installing the dependencies?',
      default: false,
      required: false,
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

    const prompts = [
      {
        type: 'list',
        name: 'databaseName',
        message: 'Select a database driver',
        when: () => !this.options.databaseName,
        default: 'postgresql',
        choices: [
          {
            name: 'MySQL',
            value: 'mysql',
          },
          {
            name: 'PostgreSQL',
            value: 'postgresql',
          },
          {
            name: 'MariaDB',
            value: 'mariadb',
          },
          {
            name: 'Do not select any',
            value: null,
          },
        ],
      },
      {
        type: 'list',
        name: 'runPackageScripts',
        message: `Do you want to automatically run the scripts that configure the package, then installing the dependencies?`,
        choices: [
          {
            name: 'yes',
            value: true,
          },
          {
            name: 'no',
            value: false,
          },
        ],
        when: () => !this.options.runPackageScripts,
      },
    ]

    const answers = await this.prompt(prompts)

    const databaseName = this.options.databaseName || answers.databaseName

    this.#answers = {
      projectName: this.options.projectName,
      databaseName: DataProcessor.filterDatabaseName(databaseName),
      runPackageScripts:
        this.options.runPackageScripts || answers.runPackageScripts || false,
    }
  }

  async #addGit() {
    const generator = this.#generatorProvider.getGitGenerator()
    await this.composeWith(generator)
  }

  async #addEslint() {
    const generator = this.#generatorProvider.getEslintGenerator()
    await this.composeWith(generator)
  }

  async #addHusky() {
    const generator = this.#generatorProvider.getHuskyGenerator()
    await this.composeWith(generator)
  }

  async #addLintStaged() {
    const generator = this.#generatorProvider.getLintStagedGenerator()
    await this.composeWith(generator)
  }

  async #addPrettier() {
    const generator = this.#generatorProvider.getPrettierGenerator()
    await this.composeWith(generator)
  }

  async #addBabel() {
    const generator = this.#generatorProvider.getBabelGenerator()
    await this.composeWith(generator)
  }

  async #addCommitLint() {
    const generator = this.#generatorProvider.getCommitLintGenerator()
    await this.composeWith(generator)
  }

  async #addDocker() {
    const generator = this.#generatorProvider.getDockerGenerator()
    await this.composeWith(generator)
  }

  async #addDockerCompose() {
    const generator = this.#generatorProvider.getDockerComposeGenerator()
    await this.composeWith(generator)
  }

  async #addJsonSchemas() {
    const generator = this.#generatorProvider.getJsonSchemasGenerator()
    await this.composeWith(generator)
  }

  async #addOpenApi(args) {
    const generator = this.#generatorProvider.getOpenApiGenerator()
    await this.composeWith(generator, args)
  }

  async #addSwagger() {
    const generator = this.#generatorProvider.getSwaggerGenerator()
    await this.composeWith(generator)
  }

  async #addSequelize() {
    const generator = this.#generatorProvider.getSequelizeGenerator()
    await this.composeWith(generator)
  }

  async configuring() {
    const { projectName } = this.#answers

    await this.#addGit()
    await this.#addEslint()
    await this.#addHusky()
    await this.#addLintStaged()
    await this.#addPrettier()
    await this.#addBabel()
    await this.#addCommitLint()
    await this.#addSequelize()
    await this.#addOpenApi([projectName])
    await this.#addSwagger()
    await this.#addDocker()
    await this.#addDockerCompose()
    await this.#addJsonSchemas()
  }

  writing() {
    const { projectName, databaseName } = this.#answers

    this.env.cwd = this.destinationPath('api')

    this.destinationRoot(this.env.cwd)

    this.fs.copy(this.templatePath('api/src'), this.destinationPath('src'))
    this.fs.copy(
      this.templatePath('api/.env.example'),
      this.destinationPath('.env.example'),
    )
    this.fs.copy(this.templatePath('api/.env'), this.destinationPath('.env'))
    this.fs.copy(
      this.templatePath('api/package.json'),
      this.destinationPath('package.json'),
    )
    this.fs.copyTpl(
      this.templatePath('api/README.md'),
      this.destinationPath('README.md'),
      {
        projectName,
      },
    )

    const packageJsonContent = {
      name: projectName,
      dependencies: {},
    }

    switch (databaseName) {
      case 'mysql':
        packageJsonContent.dependencies.mysql2 = '^3.9.3'
        break
      case 'mariadb':
        packageJsonContent.dependencies.mariadb = '^3.3.0'
        break
      case 'postgresql':
        packageJsonContent.dependencies.pg = '^8.3.3'
        packageJsonContent.dependencies['pg-hstore'] = '^2.3.3'
        break
    }

    this.packageJson.merge(packageJsonContent)
  }

  #getDependencyManager(dependencyManagers) {
    for (const dependencyManager of dependencyManagers) {
      this.log(`Find ${dependencyManager}`)
      const isAvailable = this.#dependencyManagerAvailable(dependencyManager)
      if (isAvailable) {
        return dependencyManager
      }
    }
  }

  #dependencyManagerAvailable(name) {
    try {
      this.spawnSync(`${name}`, ['--version'])
      return true
    } catch (err) {
      return false
    }
  }

  #runPackageScripts(dependencyManager) {
    console.log('\n********** Run scripts from package.json **********')
    const scriptArguments = [['init'], ['format:fix']]
    for (const args of scriptArguments)
      this.spawnSync(`${dependencyManager}`, ['run', ...args])
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
    const dependencyManagers = ['yarn', 'npm']
    const { runPackageScripts } = this.#answers

    if (runPackageScripts) {
      const dependencyManager = this.#getDependencyManager(dependencyManagers)
      this.log(`using ${dependencyManager}`)

      this.#runPackageScripts(dependencyManager)
    }

    this.#runGoodBye()
  }
}
