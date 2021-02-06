#!/bin/sh
set -e

red='\e[21;31m%s\e[0m\n'
green='\e[21;32m%s\e[0m\n'
yellow='\e[21;33m%s\e[0m\n'
blue='\e[21;34m%s\e[0m\n'
magenta='\e[21;35m%s\e[0m\n'
cyan='\e[21;36m%s\e[0m\n'
white='\e[21;97m%s\e[0m\n'

## start docker
LOCAL_PORT=8888
DOCKER_PORT=80
DOCKER_TAG=1.0
CONTAINER_NAME=tms_frontend
cd frontend/tms
printf "$yellow" "[1/3] >> remove docker container"
printf "$white" "===================================="
##docker ps --filter "status=exited" | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm
##docker images | grep "<none>" | awk '{print $3}' | xargs  --no-run-if-empty  docker rmi
docker ps -aq | awk '{print $1}' | xargs --no-run-if-empty docker rm -f
sleep 5

docker images | grep "<none>" | awk '{print $3}' | xargs  --no-run-if-empty  docker rmi -f
sleep 5
# RUNNING_CONTAINERS=$(docker ps -aq)
# for i in $RUNNING_CONTAINERS
# do
#     echo "START ROMOVEING CONTAINER: ${i}"
#     docker stop ${i}
#     docker rm   ${i}
#     sleep 5
# done
 
printf "$yellow" "[2/3] >> build docker container"
printf "$white" "===================================="
docker build -t  tms_frontend:1.0 .


printf "$green" "[3/3] >> Starting HTTP Server on port $LOCAL_PORT"
printf "$white" "===================================="
docker run -p ${LOCAL_PORT}:${DOCKER_PORT} --net=host --name ${CONTAINER_NAME}  ${CONTAINER_NAME}:${DOCKER_TAG}