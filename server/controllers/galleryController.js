import {
   createGallery,
   fetchAllGallery,
   removeGallery
} from "../services/galleryService.js";

// Ajouter une image
export const addGallery = async (req, res) => {
   try {
      const { alt } = req.body;
      const file = req.file;

      const gallery = await createGallery(file, alt);
      res.status(200).json({ message: "Image bien ajoutée à la gallery.", gallery });
   } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message || "Erreur lors de l'ajout de l'image." });
   }
};

// récupérer toutes les images
export const getAllGallery = async (req, res) => {
   try {
      const galleries = await fetchAllGallery();
      res.status(200).json(galleries);
   } catch (e) {
      res.status(400).json({ message: "Impossible de récupérer les images." });
   }
};

// upprimer une image
export const deleteGallery = async (req, res) => {
   try {
      const { id } = req.params;
      await removeGallery(id);
      res.status(200).json({ message: "Image supprimée." });
   } catch (e) {
      res.status(400).json({ message: "Impossible de supprimer cette image." });
   }
};
