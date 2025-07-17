import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// pour ajouter un avis
export const addComment = async (req, res) => {
   try {
      const { content, rating } = req.body;

      // sécurité
      if (content.trim() === "" || rating <= 0 || rating > 5) {
         return res.status(400).json({ message: "Veuillez remplir les champs correctement." });
      }

      const newComment = await Comment.create({
         content,
         rating,
         userId: req.userId
      });

      res.status(200).json({ message: "Commentaire ajouté.", comment: newComment });

   } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Impossible d'ajouter un nouveau commentaire." });
   }
};

// pour récupérer tous les avis avec nom et prénom du user
export const getAllComments = async (req, res) => {
   try {
      const comments = await Comment.findAll({
         include: {
            model: User,
            attributes: ["firstname", "lastname"]
         },
         order: [['createdAt', 'DESC']]
      });

      res.status(200).json(comments);
   } catch (e) {
      res.status(400).json({ message: "Impossible de récupérer les avis." });
   }
};


// pour supprimer un avis
export const deleteComment = async (req, res) => {
   try {
      const { id } = req.params;

      const deleted = await Comment.destroy({ where: { id } });

      if (deleted) {
         res.status(200).json({ message: "Le commentaire a bien été supprimé." });
      } else {
         res.status(404).json({ message: "Commentaire introuvable." });
      }

   } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Suppression impossible." });
   }
};
