FROM node:slim

RUN npm i -g typescript

COPY package.json .
RUN npm i

WORKDIR /temp

COPY . .
RUN npm run build
RUN npm run install:front
RUN npm run build:front

RUN mv ./dist ./../app

WORKDIR /
RUN rm -rf ./temp

WORKDIR /app
ENV PORT=3001
ENV NODE_ENV=production

EXPOSE 3001 3001
CMD ["node", "server.js"]
