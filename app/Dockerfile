FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ARG APP_PORT

CMD [ "npm","start" ]

EXPOSE ${APP_PORT}