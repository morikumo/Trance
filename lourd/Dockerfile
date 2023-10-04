# Utilisez la même image de base que celle de votre application backend
FROM node:18-alpine

# Créez le répertoire de travail
WORKDIR /usr/src/app

# Copiez les fichiers de configuration
COPY package*.json ./

# Installez les dépendances
RUN npm install -g @nestjs/cli && npm install

# Copiez le reste des fichiers
COPY . .

# Exposez le port 3000
EXPOSE 3000

# Démarrez l'application
CMD [ "npm", "run", "start:dev" ]

