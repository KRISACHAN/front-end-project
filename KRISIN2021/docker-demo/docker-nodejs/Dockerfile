FROM mhart/alpine-node:14.17.3

ENV SERVER_PORT=$SERVER_PORT \
    EXPOSE_PORT=$EXPOSE_PORT \
    CONTAINER_NAME=$CONTAINER_NAME \
    IMAGE_NAME=$IMAGE_NAME

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD node index.js

EXPOSE ${SERVER_PORT}