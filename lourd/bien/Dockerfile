# Étape de build
FROM node:16-alpine  AS bien-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
ENTRYPOINT [ "npm", "start" ]
