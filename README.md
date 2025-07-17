# Hatou'Touch

**Hatou'Touch** est une plateforme web de commandes de boxs salées sur mesure, pensée pour répondre aux besoins d'événements privés ou professionnels. À travers une interface intuitive et épurée, les utilisateurs peuvent découvrir les créations de l'entreprise, soumettre une demande de devis, et gérer leur historique personnel. Le projet repose sur une architecture complète (frontend, backend, base de données) et est actuellement en développement.

---

## ✨ Fonctionnalités principales

- Authentification sécurisée (inscription, connexion)
- Galerie photo des réalisations
- Formulaire complet de demande de devis
- Interface d'administration pour gestion des demandes
- Notification par mail lors de l’acceptation ou du refus d’un devis
- Paiement d'acompte sécurisé via Stripe (prévu)


---

## 🧩 Technologies utilisées

### Frontend
- React.js
- React Router DOM
- Axios
- React Toastify
- Lightbox
- reCAPTCHA (visuel)

### Backend
- Node.js
- Express.js
- Sequelize (MySQL pour les utilisateurs et les avis)
- Mongoose (MongoDB pour les devis, contacts et galeries)
- Nodemailer (envoi de mails)

### Autres outils
- JIRA (gestion du projet en Scrum)
- Canva & Figma (design UI/UX)
- Draw.io (modélisation UML)
- VS Code

---

## 🎨 Charte graphique

### Couleurs
- Fond principal : `#f1eeeb`  
- Blocs / formulaires : `#e1dcd5`  
- Texte et boutons : `#73655c`

### Typographie
- Titres : **Alegreya Bold**  
- Texte courant : **Alegreya Regular**

---

## 🐳 Dockerisation

L’application backend a été dockerisée pour faciliter l’installation et l’exécution dans un environnement isolé.

### Docker Compose

Un fichier `docker-compose.yml` permet de lancer en un clic :
- Le serveur Node.js (`/server`)
- MongoDB (pour les devis, les messages et la galerie)
- MySQL (pour les utilisateurs et les avis)

```bash
# Lancer tous les services
docker-compose up --build

## 📁 Arborescence simplifiée
HatouTouch1/
├── front/             # Frontend React
├── server/            # Backend Node.js + Express
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md
