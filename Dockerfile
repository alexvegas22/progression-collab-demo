#FROM allthings/nightwatch:latest as build-stage
FROM mycargus/nightwatch:master as build-stage
FROM blueimp/geckodriver:master as build-stage2
#FROM seleniumHQ/docker-selenium:master as build-stage2
USER root
ARG NODE_ENV=prod #défaut, surdéfinir avec --build-arg







#RUN npm config set unsafe-perm true
#RUN npm install npm@latest -g
#https://hub.docker.com/r/allthings/nightwatch/tags
# install simple http server for serving static content
RUN npm install -g http-server



# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY app/package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY app/ .

#EXPOSE 8080

# Serveur de développement
CMD [ "npm", "run", "serve" ]

#RUN npm install npm@latest -g
#Production  build app for production with minification
RUN npm run build

FROM nginx:stable as production-stage
ENV NODE_ENV=$NODE_ENV

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/
COPY 25-envsubst-vue-app.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/25-envsubst-vue-app.sh


