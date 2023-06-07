FROM node:lts-alpine as build-stage
#Environnement défaut, surdéfinir avec --build-arg ou un fichier .env
ARG NODE_ENV=production
ARG MODE=production
ARG VITE_APP_VERSION=\$VITE_APP_VERSION
ARG VITE_API_URL=\$VITE_API_URL
ARG VITE_FF_URL=\$VITE_FF_URL
ARG VITE_FF_SECRET=\$VITE_FF_SECRET
ARG VITE_I18N_FALLBACK_LOCALE=\$VITE_I18N_FALLBACK_LOCALE
ARG VITE_I18N_LOCALE=\$VITE_I18N_LOCALE
ARG VITE_DELAI_SAUVEGARDE=\$VITE_DELAI_SAUVEGARDE
ARG VITE_API_AUTH_KEY_TTL=\$VITE_API_AUTH_KEY_TTL
ARG VITE_DOMAINE=\$VITE_DOMAINE
ARG VITE_SUBDIR=\$VITE_SUBDIR

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY app/package-lock.json package.json ./

# install project dependencies

RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY app/ .

# Copie la version patchée de markdown-it-imsize pour l'intégration avec «vite».
RUN mkdir -p /app/node_modules/markdown-it-imsize
COPY markdown-it-imsize/package.json /app/node_modules/markdown-it-imsize/
COPY markdown-it-imsize/lib /app/node_modules/markdown-it-imsize/lib/

#EXPOSE 8080

# Serveur de développement
CMD [ "npm", "run", "dev"]

#Production  build app for production with minification
RUN npm run build -- --mode=$MODE

FROM nginx:stable as production-stage

ENV NODE_ENV=$NODE_ENV
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/
COPY docker/entrypoint/* /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/*
COPY VERSION /docker-entrypoint.d/
