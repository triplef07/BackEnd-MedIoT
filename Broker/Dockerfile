FROM node:latest

WORKDIR /

COPY package.json ./

RUN npm install npm@latest

RUN npm install --force

COPY . .

ENV PORT = 13217

EXPOSE 13217

CMD ["npm","run","start"]