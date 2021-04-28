#Commandes pour build et run l'image Docker
# docker build -t "progression" .
# docker run -d -p 8080:8080 progression

FROM node:lts-alpine as build-stage



# install simple http server for serving static content
RUN npm install -g http-server



# make the 'app' folder the current working directory
WORKDIR /app



# copy both 'package.json' and 'package-lock.json' (if available)
COPY app/package*.json ./


# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY app/ /app

# build app for production with minification
# RUN npm run build

# Développement

EXPOSE 8080

CMD [ "npm", "run", "serve" ]


# #Production 
# FROM nginx:stable as production-stage
# 
# RUN apt update && apt -y install php php-cli php-fpm && apt autoclean
# 
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# #EXPOSE 80
# 
# COPY default.conf /etc/nginx/conf.d/
# RUN echo listen.mode=0777 >> /etc/php/7.3/fpm/php-fpm.conf
# 
# CMD service php7.3-fpm start && service nginx start && tail -f /dev/null
