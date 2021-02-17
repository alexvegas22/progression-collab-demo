
FROM node:lts-alpine3.10
RUN npm install -g json-server

WORKDIR /server

COPY . .
EXPOSE 3000
CMD json-server  db.json