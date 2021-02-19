FROM debian:10-slim

WORKDIR /server

RUN apt-get update \
  && apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs

RUN npm install -g json-server

COPY ./*.json ./

ENTRYPOINT ["json-server", "--port", "8080", "--host", "0.0.0.0", "db.json", "--routes", "routes.json"]



# commande to build
#   docker build -t jsonserver .

# command to run
#   docker run --rm -it --name jsonserver-container -p 3000:8080 jsonserver

# command to stop
#   sudo docker container stop jsonserver-container