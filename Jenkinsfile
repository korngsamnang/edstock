pipeline {
    agent any 
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Cloning the GitHub repository
                    git credentialsId: 'github-credentials', url: 'https://github.com/korngsamnang/edstock.git'
                }
            }
        }
    }
    post {
        success {
            echo 'Repository cloned successfully.'
        }
        failure {
            echo 'Failed to clone the repository.'
        }
    }
}
