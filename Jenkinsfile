pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/korngsamnang/edstock.git'
        TARGET_DIR = '/home/ubuntu/edstock'  // Directory on EC2 where the project is cloned
        DOCKER_COMPOSE_FILE = '/home/ubuntu/edstock/docker-compose.yml' // Path to Docker Compose file
        SSH_USER = 'ubuntu'  // SSH user for EC2 instance
        SSH_HOST = '18.142.55.141' // Replace with your EC2 public IP or DNS
        SSH_CREDENTIALS_ID = 'ec2-ssh-key'  // Jenkins credentials ID for EC2 SSH
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master',
                    credentialsId: 'github-credentials', 
                    url: "${GIT_REPO_URL}"
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sshagent(['${SSH_CREDENTIALS_ID}']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} 'if [ ! -d "${TARGET_DIR}" ]; then git clone ${GIT_REPO_URL} ${TARGET_DIR}; else cd ${TARGET_DIR} && git pull; fi'
                        """
                    }
                }
            }
        }

        stage('Execute Docker Compose on EC2') {
            steps {
                script {
                    sshagent(['${SSH_CREDENTIALS_ID}']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} 'cd ${TARGET_DIR} && docker compose down && docker compose up -d --build'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
