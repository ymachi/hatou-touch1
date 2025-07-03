import Contact from "../models/contactModel.js";


// pour ajouter un contact
export const addContact = async (req,res) => {
   try {
      const {lastname, firstname, email, tel, message} = req.body;
      
      // sécurité
      if(lastname.trim() === "" 
      || firstname.trim() === ""
      || email.trim() === ""
      || tel.trim() === ""
      || message.trim() === ""){
         return res.status(400).json({message: "Veuillez remplir tous les champs."})
      }
      const newContact = new Contact({
         lastname,
         firstname,
         email,
         tel,
         message
      })
      
      await newContact.save()
      
      res.status(200).json({message: "Contact enregistré."})
      
      
      
   } catch (e) {
      res.status(400).json({message: "Impossible d'ajouter un contact."})
   }
}

// pour récupérer toutes les demandes de contact
export const getAllContacts = async (req, res) => {
   try {
      
      const contacts = await Contact.find({});
      res.status(200).json(contacts)
      
      
   } catch (e) {
      res.status(400).json({message: "Impossible de récupérer toutes les demandes de contact."})
   }
}

// pour récupérer un seul contact
export const getContact = async (req, res) => {
   try {
      
      const {id} = req.params;
      
      const contact = await Contact.findById(id);
      
      res.status(200).json({contact});
      
   } catch (e) {
      res.status(400).json({message: "Impossible de récuperer cette demande de contact."})
   }
}

// pour supprimer une demande de contact 
export const deleteContact = async (req, res) => {
   try {
      
      const {id} = req.params;
      
      await Contact.findByIdAndDelete(id)
      
      res.status(200).json({message:"Suppression effectuée."})
      
      
   } catch (e) {
      res.status(400).json({message: "Suppression impossible."})
   }
}

// pour changer le statut
export const changeStatus = async (req, res) => {
   try {
      const {id} = req.params
      const {accepted, refused} = req.body
      
      // sécurité
      if(!accepted && !refused || accepted && accepted.trim() === "" || refused && refused.trim() === "" ){
         return res.status(400).json({message: "Choix invalide."})
      }
      
      // condition si j'appuie sur le bouton valider ou refuser
      if(accepted){
       await Contact.findByIdAndUpdate(id, {status: accepted})
      } else if (refused){
         await Contact.findByIdAndUpdate(id, {status: refused})
      }
     res.status(200).json({message: "Le statut a bien été changé."})
     
   } catch (e) {
      
      res.status(400).json({message: "Impossible de changer le statut."})
   }
}


