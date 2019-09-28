pipeline {
  agent {
    node {
      label 'nodeJS'
    }

  }
  stages {
    stage('prepare') {
      steps {
        sh 'curl -o- -L https://yarnpkg.com/install.sh | bash'
      }
    }
    stage('error') {
      steps {
        sh 'yarn test'
      }
    }
  }
}