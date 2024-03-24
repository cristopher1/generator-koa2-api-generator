import Generator from 'yeoman-generator'

export default class GeneratorDocker extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('api/Dockerfile'),
      { image_node_version: 16, project_name: 'new_project' },
    )
    this.fs.copy(
      this.templatePath('docker-entrypoint.sh'),
      this.destinationPath('api/docker-entrypoint.sh'),
    )
    this.fs.copy(
      this.templatePath('.dockerignore'),
      this.destinationPath('api/.dockerignore'),
    )
  }
}
