pipeline {
    agent any

    environment {
        GIT_REPO = 'git@github.com:korngsamnang/edstock.git'
        DEPLOY_DIR = '/home/ubuntu/edstock'
        EC2_USER = 'ubuntu'
        EC2_HOST = '54.179.191.117'
        STACK_NAME = 'edstock-app' // Name of your Docker stack
        DOCKER_COMPOSE_FILE = 'docker-compose.yml' // Make sure this file exists in your repo
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Clone Repo on EC2') {
            steps {
                sshagent(['ec2-server-key']) { // Use your credentials ID for SSH
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        if [ ! -d "${DEPLOY_DIR}" ]; then
                            git clone ${GIT_REPO} ${DEPLOY_DIR}
                        else
                            cd ${DEPLOY_DIR} && git pull
                        fi
                    '
                    """
                }
            }
        }

        stage('Deploy Docker Stack on EC2') {
            steps {
                sshagent(['ec2-server-key']) { // Use your credentials ID for SSH
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        cd ${DEPLOY_DIR} && docker stack deploy -c ${DOCKER_COMPOSE_FILE} ${STACK_NAME}
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
        always {
            // This step will run whether the pipeline fails or succeeds
            echo 'Cleaning up resources...'
        }
    }
}
