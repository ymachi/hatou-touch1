// models/index.js

import sequelize from "../config/sequelize.js";
import Comment from "./comment.model.js";
import User from "./user.model.js";

// Ajoute ici d'autres modèles SQL si tu en ajoutes plus tard

const syncModels = async () => {
  try {
    await User.sync();
    await Comment.sync(); 
  } catch (error) {
    console.error(" Erreur de synchronisation :", error);
  }
};

export { sequelize, User, Comment, syncModels };
