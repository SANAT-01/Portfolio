pipeline {
    agent any

    environment {
        NEXT_PUBLIC_EMAILJS_SERVICE_ID = credentials('emailjs-service-id')
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = credentials('emailjs-template-id')
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = credentials('emailjs-public-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh '''
                    npm ci
                    npm run lint
                '''
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                    docker build \
                      --build-arg NEXT_PUBLIC_EMAILJS_SERVICE_ID=$NEXT_PUBLIC_EMAILJS_SERVICE_ID \
                      --build-arg NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=$NEXT_PUBLIC_EMAILJS_TEMPLATE_ID \
                      --build-arg NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=$NEXT_PUBLIC_EMAILJS_PUBLIC_KEY \
                      -t portfolio:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d --force-recreate
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://127.0.0.1:24817/ || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployed successfully'
        }
        failure {
            echo 'Pipeline failed — check logs above'
        }
    }
}