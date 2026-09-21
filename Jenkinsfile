pipeline {
    agent any

    environment {
        // VPS public address + HOST_PORT from docker-compose.yml. Not 127.0.0.1:
        // if Jenkins runs in a container, that is Jenkins' own loopback, not the VPS.
        DEPLOY_URL = 'http://187.127.138.250:24817'
        // NEXT_PUBLIC_EMAILJS_SERVICE_ID = credentials('emailjs-service-id')
        // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = credentials('emailjs-template-id')
        // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = credentials('emailjs-public-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Test') {
        //     steps {
        //         sh '''
        //             npm ci
        //             npm run lint
        //         '''
        //     }
        // }

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
                // Retry for ~30s instead of a fixed sleep: Next.js start time varies.
                sh '''
                    curl -fsS -o /dev/null --max-time 10 \
                      --retry 10 --retry-delay 3 --retry-connrefused \
                      "$DEPLOY_URL/"
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
            sh 'docker compose ps || true'
            sh 'docker compose logs --tail=50 || true'
        }
    }
}
