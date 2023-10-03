pipeline {
    agent any
    stages {
        stage('staging') {
            steps {
                sh 'make deploy-stage'
            }
        }
        stage('prod') {
            steps {
                sh 'make deploy-prod'
            }
        }
    }
}