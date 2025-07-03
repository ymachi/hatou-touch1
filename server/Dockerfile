# Étape 1 : utiliser une image Node officielle
FROM node:18

# Étape 2 : définir le répertoire de travail
WORKDIR /app

# Étape 3 : copier les fichiers nécessaires
COPY package*.json ./

# Étape 4 : installer les dépendances
RUN npm install

# Étape 5 : copier tout le reste
COPY . .

# Étape 6 : exposer le port
EXPOSE 5000

# Étape 7 : commande de lancement
CMD ["npm", "run", "prod"]

