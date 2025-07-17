import sequelize from "../config/sequelize.js";
import Comment from "./comment.model.js";
import User from "./user.model.js";

// déclaration des relations
User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: "userId" });


const syncModels = async () => {
  try {
    await sequelize.sync(); // Cela synchronise tous les modèles associés
    console.log(" Modèles synchronisés avec succès.");
  } catch (error) {
    console.error("Erreur de synchronisation :", error);
  }
};


export { sequelize, User, Comment, syncModels };
