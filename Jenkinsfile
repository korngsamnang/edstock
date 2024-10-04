pipeline {
    agent any
    environment {
        GIT_REPO_URL = 'https://github.com/korngsamnang/edstock.git'
        TARGET_DIR = '/home/ubuntu/edstock'  // Directory on EC2 where repo will be cloned
        SSH_USER = 'ubuntu'
        SSH_HOST = '18.142.55.141' // Replace with EC2 public IP
        SSH_CREDENTIALS_ID = 'ec2-ssh-credentials'  // Replace with your SSH credentials ID in Jenkins
    }
    stages {
        stage('Clone Repo on EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-credentials']) {  // Replace with your actual SSH credentials ID
                    // SSH into EC2 and clone the repo
                    sh "ssh ${SSH_USER}@${SSH_HOST} 'git clone ${GIT_REPO_URL} ${TARGET_DIR} || (cd ${TARGET_DIR} && git pull)'"
                }
            }
        }
        stage('Run Docker Compose on EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-credentials']) {  // Replace with your actual SSH credentials ID
                    // SSH into EC2 and run the Docker Compose file
                    sh "ssh ${SSH_USER}@${SSH_HOST} 'cd ${TARGET_DIR} && docker compose up -d --build'"
                }
            }
        }
    }
    post {
        failure {
            echo 'Deployment failed!'
        }
    }
}
