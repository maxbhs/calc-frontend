pipeline {
	agent any
	stages {
		stage('Build code') {
			steps{
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Compile/compile_app.sh .'
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Compile/compile_${Language}_app.sh .'
				sh 'chmod 700 compile_app.sh'
				sh 'chmod 700 compile_${Language}_app.sh'
				sh './compile_app.sh'
				sh 'rm compile_app.sh'
				sh 'rm compile_${Language}_app.sh'
			}	
        	}
		stage('Create docker image'){
			steps {
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Docker/create_docker_image.sh .'
				sh 'chmod 700 create_docker_image.sh'
				sh './create_docker_image.sh'
				sh 'rm create_docker_image.sh'
			}
		}
        	stage('Test') {
            		steps {
                		echo 'Testing..'
            		}
        	}
        	stage('Deploy') {
            		steps {
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/deploy_docker_image.sh .'
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/resource-manifests/appname-deployment.yaml ${AppName}-deployment.yaml'
				sh 'cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/resource-manifests/service-appname-lb.yaml service-${AppName}-lb.yaml'
				sh 'chmod 700 deploy_docker_image.sh'
				sh './deploy_docker_image.sh ${AppName}-deployment.yaml service-${AppName}-lb.yaml'
            		}		
        	}
	}
}


