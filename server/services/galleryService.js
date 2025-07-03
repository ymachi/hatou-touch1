import Gallery from "../models/galleryModel.js";

// Ajouter une image à la galerie
export const createGallery = async (file, alt) => {
   if (!file || !alt || alt.trim() === "") {
      throw new Error("Veuillez remplir tous les champs.");
   }

   const newGallery = new Gallery({
      image: {
         src: file.filename,
         alt
      }
   });

   return await newGallery.save();
};

// Récupérer toutes les images
export const fetchAllGallery = async () => {
   return await Gallery.find({});
};

// Supprimer une image
export const removeGallery = async (id) => {
   return await Gallery.findByIdAndDelete(id);
};
