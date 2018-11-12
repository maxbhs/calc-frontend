pipeline {
	agent any
	stages {
		stage('Build code') {
			steps{
				script{
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Compile/compile_app.sh .
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Compile/compile_${Language}_app.sh .
					chmod 700 compile_app.sh
					chmod 700 compile_${Language}_app.sh
					./compile_app.sh
					rm compile_app.sh
					rm compile_${Language}_app.sh
				}
			}	
        	}
		stage('Create docker image'){
			steps {
				script{
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Docker/create_docker_image.sh .
					chmod 700 create_docker_image.sh
					./create_docker_image.sh
					rm create_docker_image.sh
				}
			}
		}
        	stage('Test') {
            		steps {
                		echo 'Testing..'
            		}
        	}
        	stage('Deploy') {
            		steps {
                		script{
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/deploy_docker_image.sh .
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/resource-manifests/appname-deployment.yaml ${AppName}-deployment.yaml
					cp $JENKINS_HOME/workspace/TFG-WORKSPACE/ScriptsJenkinsTFG/Deploy/resource-manifests/service-appname-lb.yaml service-${AppName}-lb.yaml
					chmod 700 deploy_docker_image.sh
					./deploy_docker_image.sh ${AppName}-deployment.yaml service-${AppName}-lb.yaml
				}
            		}		
        	}
	}
}


