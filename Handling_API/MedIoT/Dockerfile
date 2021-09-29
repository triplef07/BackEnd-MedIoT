FROM node:latest

WORKDIR /

COPY package.json ./

# RUN npm install -g yarn

RUN npm install --force

# RUN apk update && apk add bash

COPY . .

ENV PORT = 3000

EXPOSE 3000

CMD ["npm","start"]