# Progression frontend

## 1. Pré-requis
- Système d'exploitation [Windows](https://www.microsoft.com/en-us/software-download/), [Linux](https://www.linux.org/pages/download/), ou [Mac](https://support.apple.com/downloads/macos)
- [git](https://git-scm.com/downloads)
- [nodejs](https://nodejs.org/en/) (v10+ recommandé)
- [npm](https://github.com/nodesource/distributions)
- [vue-cli](https://cli.vuejs.org/guide/installation.html) (v4.x recommandé) *«facultatif»*
- [docker](https://www.docker.com/) *«facultatif»*
- Un éditeur de code ([Visual Studio Code](https://code.visualstudio.com/download) recommandé)

## 2. Installation & Configuration 
### 2.1 Obtenir le code source
La suite des opérations devra se faire à partir d'un interpréteur de commande. Pour savoir comment en ouvrir un sous Windows, Linux ou Mac, [Cliquer ici](http://codeur-pro.fr/invite-de-commande-et-terminal/)

- Cloner le projet
```
git clone https://git.dti.crosemont.quebec/progression/progression_frontend.git
```

- Ouvrir le repertoire `progression_frontend`
```
cd progression_frontend
```

### 2.2 Créer et configurer le fichier d'environnement local
- Exécuter la commande suivante pour créer le fichier des variables d'environnement
```
touch .env.local
```
- Ouvrir le fichier des variables d'environnement avec l'éditeur de votre choix *(VS Code recommandé)*
```
code .env.local
```
- Ajouter les variables d'environnement suivantes *(contacter admin pour les valeurs réelles)*
```
VUE_APP_API_URL=votre-url-api-de-base
```
```
VUE_APP_API_URL_QUESTION=votre-url-api-vers-question
```
```
VUE_APP_API_URL_VALIDATION_TENTATIVE=votre-url-api-vers-tentative
```

### 2.2 Installer les dépendances du projet
- Dans votre interpréteur de commande, exécuter la commande suivante
```
npm install
```

## 3. Exécution du programme
### 3.1 Lancer le mock-api
- Ouvrir le repertoire du mock
```
cd mock
```
- Exécuter le serveur de mock json-serveur
```
json-server --watch db.json -m middleware.js --routes routes.json --port 3000
```
Le mock sera accéssible à l'adresse :
- http://localhost:3000/

### 3.2 Lancer l'application VueJS
- Ouvrir un nouveau terminal à la racine de «progression_frontend»
- Exécuter le programme VueJS à l'aide de la commande
```
npm run serve
```
L'application sera accéssible à l'adresse :
- http://localhost:8080/