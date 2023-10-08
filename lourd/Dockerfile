# Utilisez la même image de base que celle de votre application backend
FROM node:18-alpine as Rex

# Créez le répertoire de travail
WORKDIR /usr/src/app

RUN npm install -g npm@10.1.0 @nestjs/cli

# Copiez les fichiers de configuration
COPY package*.json ./

# Installez les dépendances
RUN npm install --legacy-peer-deps

# Copiez le reste des fichiers
COPY . .

# Exposez le port 3000
EXPOSE 3000

COPY ./src/script/script.sh /

RUN chmod 755 /script.sh

# Démarrez l'application
ENTRYPOINT [ "sh", "/script.sh" ]

#CMD [ "npm" , "run", "start:dev" ]
#CMD [ "sh", "/script.sh" ]

