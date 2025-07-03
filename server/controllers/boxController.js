import mongoose from "mongoose";
import fs from 'fs'
import Box from "../models/boxModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// pour ajouter une box
export const addBox = async (req, res) => {
   try {
      const {name, category, description, amount, ingredients} = req.body 
     
       // sécurité
        if(name.trim() === "" 
        || category.trim() === ""
        || description === ""
        || parseFloat(amount) <= 0
        || ingredients.trim() === "" 

        ){
            return res.status(400).json({message: "Veuillez remplir correctement les champs."})
        }
        
        const parseIngredients = JSON.parse(ingredients)
       
      // j'instancie mon boxModel pour créer un nouvel objet
      const newBox = new Box({
         name: req.body.name,
         category: category,
         price: {
            amount: parseFloat(amount).toFixed(2),
            currency : "EUR"
         },
         description,
         ingredients : parseIngredients,
         image: req.file && req.file.filename // l'image de la box 
      })
      
      await newBox.save();
      
      res.status(200).json({message: "Box créer avec succés"})
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Impossible d'ajouter une box."})
   }
}

// pour récupérer toutes les boxs
export const getAllBoxs = async (req,res) => {
   try {
      const boxs = await Box.find({})
      res.status(200).json(boxs)
   } catch (e) {
      
      res.status(400).json({message : "Impossible de récupérer les boxs."})
   }
}

// pour récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
   try {
      const categories = await Box.distinct('category');
      
      res.status(200).json(categories);
   } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Impossible de récupérer les catégories." });
   }
}

// pour trier les boxs par catégorie
export const getBoxsByCategory = async (req, res) => {
   try {
      
      const {category} = req.params;
      
      const boxs = await Box.find({category: category});
      
      res.status(200).json(boxs);
      
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Impossible de récupérer les catégories."})
   }
}

// pour récupérer une seule box
export const getOneBox = async (req, res) => {
   try {
      
      const {id} = req.params;
      
      const box = await Box.findById(id)
      
      res.status(200).json(box)
   } catch (e) {
      res.status(400).json({message: "Impossible de récupérer cette box."})
   }
}


// pour modifier une box
export const editBox = async (req, res) => {
   try {
      const { id } = req.params;

      const { name, category, description, amount, currency } = req.body;

      if(name || category  || description || amount || currency  ){ 
            if(name && name.trim() === "" 
            || category && category.trim() === ""
            || amount  && amount <= 0
            || description && description.trim() === ""
            || currency && currency.trim() === ""){
                return res.status(400).json({message: "Veuillez remplir tous les champs !"})
            }
        }

      const selectedBox = await Box.findById(id);
      
      if(!selectedBox){
         return res.status(404).json({message: "Box non trouvée."})
      }
      
      

      const updateBox = {
         name,
         category,
         description,
         price:{
            amount,
            currency,
         }
        
       
      };
      
      if(req.file && req.file.filename){
         const oldImage =  path.join(__dirname, '..', 'public', 'img', selectedBox.image)
         console.log(oldImage);
         if(fs.existsSync(oldImage)){
            fs.unlinkSync(oldImage)
         }
         updateBox.image = req.file.filename
      }
      
    
      await Box.findByIdAndUpdate(id, updateBox);

      res.status(200).json({ message: "Modification bien effectuée." });
   } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Modification impossible." });
   }
};


// pour supprimer une box 
export const deleteBox = async (req, res) => {
   try {
      const {id} = req.params
      
      await Box.findByIdAndDelete(id)
      
      res.status(200).json({message : "La box a bien été supprimé."})
      
   } catch (e) {
      res.status(400).json({message: "Supression impossible."})
   }
}
