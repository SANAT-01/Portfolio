pipeline {
    agent any

    environment {
        // VPS public address + HOST_PORT from docker-compose.yml. Not 127.0.0.1:
        // if Jenkins runs in a container, that is Jenkins' own loopback, not the VPS.
        DEPLOY_URL = 'http://187.127.138.250:24817'
        // NEXT_PUBLIC_EMAILJS_SERVICE_ID = credentials('emailjs-service-id')
        // NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = credentials('emailjs-template-id')
        // NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = credentials('emailjs-public-key')
        // NEXT_PUBLIC_UMAMI_SCRIPT_URL = credentials('umami-script-url')
        // NEXT_PUBLIC_UMAMI_WEBSITE_ID = credentials('umami-website-id')
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
                      --build-arg NEXT_PUBLIC_UMAMI_SCRIPT_URL=$NEXT_PUBLIC_UMAMI_SCRIPT_URL \
                      --build-arg NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID \
                      -t portfolio:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                // Only force-recreate the app container on every deploy.
                // `up -d` still brings up umami/umami-db the first time,
                // but leaves them running undisturbed on later deploys —
                // force-recreating them here would bounce the analytics
                // dashboard and its DB on every portfolio release.
                sh '''
                    docker compose up -d
                    docker compose up -d --force-recreate portfolio
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
        always {
            sh 'docker builder prune -af'
        }
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
