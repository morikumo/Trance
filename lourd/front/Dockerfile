# Étape de build
FROM node:16-alpine  AS front-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
ENTRYPOINT [ "npm", "run", "dev" ]
