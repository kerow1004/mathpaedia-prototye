FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./server ./server

CMD [ "npm", "start" ]
