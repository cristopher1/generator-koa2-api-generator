import Generator from 'yeoman-generator'
import Formatter from './generator_components/Formatter.js'

export default class GeneratorDocker extends Generator {
  #answers

  constructor(args, opts) {
    super(args, opts)

    this.argument('useDocker', {
      type: Boolean,
      description:
        'Add docker support using DockerFile, .dockerignore and others',
      required: false,
    })
    this.argument('nodeVersion', {
      type: Number,
      description: 'Node version used in DockerFile. (FROM nodeVersion)',
      required: false,
    })
    this.argument('projectFolderName', {
      type: String,
      description:
        'Project folder name used in DockerFile. (WORKDIR /usr/src/projectFolderName)',
      required: false,
      default: null,
    })
  }

  async prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'useDocker',
        message:
          'Do you want to use docker support? (Dockerfile, .dockerignore and others)',
        when: () => !this.options.useDocker,
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
      },
      {
        type: 'list',
        name: 'nodeVersion',
        message: 'Select node version to docker image. (FROM nodeVersion)',
        when: (answers) =>
          (this.options.useDocker || answers.useDocker) &&
          !this.options.nodeVersion,
        choices: [
          {
            name: 'node v16',
            value: 16,
          },
          {
            name: 'node v18',
            value: 18,
          },
          {
            name: 'node v20',
            value: 20,
          },
          {
            name: 'node v21',
            value: 21,
          },
        ],
      },
      {
        type: 'input',
        name: 'projectFolderName',
        message:
          'Project folder name used in DockerFile. (WORKDIR /usr/src/projectFolderName)',
        default: this.appname,
        when: (answers) =>
          (this.options.useDocker || answers.useDocker) &&
          !this.options.projectFolderName,
        filter: (input) => Formatter.replaceSpace(input),
      },
    ]

    const answers = await this.prompt(prompts)

    this.#answers = {
      useDocker: this.options.useDocker || answers.useDocker || false,
      nodeVersion: this.options.nodeVersion || answers.nodeVersion || 16,
      projectFolderName:
        this.options.projectFolderName || answers.projectFolderName,
    }
  }

  writing() {
    if (this.#answers.useDocker) {
      const { nodeVersion, projectFolderName } = this.#answers

      this.fs.copyTpl(
        this.templatePath('api/Dockerfile'),
        this.destinationPath('api/Dockerfile'),
        {
          nodeVersion,
          projectFolderName,
        },
      )
      this.fs.copy(
        this.templatePath('api/docker-entrypoint.sh'),
        this.destinationPath('api/docker-entrypoint.sh'),
      )
      this.fs.copy(
        this.templatePath('api/wait-for-it.sh'),
        this.destinationPath('api/wait-for-it.sh'),
      )
      this.fs.copy(
        this.templatePath('api/.dockerignore'),
        this.destinationPath('api/.dockerignore'),
      )
    }
  }
}
