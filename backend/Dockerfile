FROM node:22-slim

WORKDIR /app

COPY package*.json .

RUN npm install
# copy dependencies
COPY . .
# copy source code
EXPOSE 4000

CMD node server.js