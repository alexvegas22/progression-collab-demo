# Progression frontend

## 1. Pré-requis
- Système d'exploitation [Windows](https://www.microsoft.com/en-us/software-download/), [Linux](https://www.linux.org/pages/download/), ou [Mac](https://support.apple.com/downloads/macos)
- [git](https://git-scm.com/downloads)
- [nodejs](https://nodejs.org/en/) (v10+ recommandé)
- [npm](https://github.com/nodesource/distributions)
- [vue-cli](https://cli.vuejs.org/guide/installation.html) (v4.x recommandé) *facultatif, pour le développement seulement*
- [docker](https://www.docker.com/) *«facultatif»*
- Un éditeur de texte (nano, vim, vscode, etc.)

&nbsp;

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
cp .env.exemple .env.local
```
- Ouvrir le fichier des variables d'environnement avec l'éditeur de votre choix.
```
$EDITOR .env.local
```
- Ajouter les variables d'environnement suivantes *(contacter admin pour les valeurs réelles)*
```
VUE_APP_API_URL=votre-url-api-de-base
```

## 3. Exécution du programme
### 3.1 Éxécution sans le principe de conteneurisation

#### 3.1.1 Installer les dépendances du projet
- Dans votre interpréteur de commande, exécuter la commande suivante
```
npm install
```

#### 3.1.2 Lancer le mock-api (facultatif)
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

#### 3.1.3 Lancer l'application VueJS
- Ouvrir un nouveau terminal à la racine de «progression_frontend»
- Exécuter le programme VueJS à l'aide de la commande
```
npm run serve
```
L'application sera accéssible à l'adresse :
- http://localhost:8080/


### 3.2 Éxécution avec le principe de conteneurisation (docker)
#### 3.2.1 Installer docker-compose
Bien que vous ayez installé «docker», il est possible que vous n'ayez pas également «docker-compose». Pour ce faire, [lisez la documentation ici](https://docs.docker.com/compose/install/)

#### 3.2.2 Construire les images de «progression-frontend» et du «mock-api»
- Dans votre interpréteur de commande, exécuter la commande suivante
```
docker-compose build
```

#### 3.2.3 Exécuter les conteneurs
- Dans votre interpréteur de commande, exécuter la commande suivante
```
docker-compose up
```

L'application sera accéssible à l'adresse :
- http://localhost:8080/

Le mock api sera accéssible à l'adresse :
- http://localhost:3000/
