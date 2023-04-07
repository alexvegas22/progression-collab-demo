# Progression frontend

## 1. Pré-requis
- [git](https://git-scm.com/downloads)
- [docker](https://www.docker.com/) *«facultatif»*

## 2. Installation & Configuration 

### 2.1 Obtenir le code source

- Cloner le projet
```
git clone --recurse-submodules https://git.dti.crosemont.quebec/progression/progression_frontend.git
cd progression_frontend
```

### 2.2 Créer et configurer le fichier d'environnement local
Créer le fichier .env ou copier le ficher d'exemple `env.exemple`
```
cp env.exemple .env
```

Modifier les options de configuration minimales :

#### URL de l'application web

```
VITE_API_URL=<URL de l'API>
```

Exemple:
```
VITE_API_URL=http://localhost/api/v1
```

## Exécution de l'application

- Dans votre interpréteur de commande, exécuter la commande suivante
```
docker-compose up -d app
```

L'application sera accéssible à l'adresse :
- http://localhost:8080/
