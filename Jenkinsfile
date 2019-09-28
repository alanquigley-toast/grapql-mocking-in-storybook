pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh '''npm install -g yarn && yarn install
'''
      }
    }
    stage('') {
      steps {
        sh 'yarn test'
      }
    }
  }
}