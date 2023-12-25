FROM node:18.7.0-alpine3.15

RUN mkdir /client
WORKDIR /client

RUN apk update && apk add yarn

COPY . .

RUN yarn install

CMD ["yarn", "run", "start"]
