pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'github-credentials' // ID for GitHub credentials in Jenkins
        SSH_CREDENTIALS_ID = 'ec2-ssh-key' // ID for SSH key credentials in Jenkins
        EC2_IP = '18.142.55.141' // Replace with your EC2 instance IP
        REPO_URL = 'https://github.com/korngsamnang/edstock.git' // Your GitHub repository URL
        APP_DIR = '/home/ubuntu/edstock' // Directory to clone the repo into
    }

    stages {
        stage('Clone or Pull Repo') {
            steps {
                script {
                    try {
                        if (fileExists(APP_DIR)) {
                            dir(APP_DIR) {
                                sh 'git pull origin main' // Pull the latest changes
                            }
                        } else {
                            // Clone the repository if it doesn't exist
                            withCredentials([string(credentialsId: GIT_CREDENTIALS_ID, variable: 'GIT_TOKEN')]) {
                                sh "git clone https://$GIT_TOKEN@github.com/korngsamnang/edstock.git ${APP_DIR}" // Replace with your GitHub username
                            }
                        }
                    } catch (Exception e) {
                        error "Failed to clone or pull repository: ${e.message}"
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sshagent([SSH_CREDENTIALS_ID]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_IP} 'cd ${APP_DIR} && docker compose down && docker compose up -d --build'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
