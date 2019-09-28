pipeline {
  agent any
  stages {
    stage('prepare') {
      steps {
        sh 'npm install yarn'
      }
    }
    stage('error') {
      steps {
        sh 'yarn test'
      }
    }
  }
}