pipeline {
    agent any
    stages {
        stage('staging') {
            steps {
                sh 'make deploy-stage'
            }
        }
    }
}