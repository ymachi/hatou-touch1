

import Comment from "../models/comment.model.js";

// ajoute un commentaire
export const createComment = async ({ content, rating, userId }) => {
  if (content.trim() === "" || rating <= 0 || rating > 5) {
    throw new Error("Champs invalides");
  }

  return await Comment.create({ content, rating, userId });
};

// récupère tous les commentaires
export const fetchAllComments = async () => {
  return await Comment.findAll();
};

// supprime un commentaire
export const removeComment = async (id) => {
  return await Comment.destroy({ where: { id } });
};
