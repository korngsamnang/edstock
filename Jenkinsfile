pipeline {
    agent any

    environment {
        GIT_REPO = 'git@github.com:korngsamnang/edstock.git'
        DEPLOY_DIR = '/home/ubuntu/edstock'
        EC2_USER = 'ubuntu'
        EC2_HOST = '54.179.191.117'
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

        stage('Run Docker Stack on EC2') {
            steps {
                sshagent(['ec2-server-key']) { // Use your credentials ID for SSH
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                        cd ${DEPLOY_DIR} && docker stack deploy -c docker-compose.yml edstock-app
                    '
                    """
                }
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed!'
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
