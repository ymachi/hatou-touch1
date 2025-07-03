import Order from "../models/orderModel.js";
import Box from "../models/boxModel.js"
import mongoose from "mongoose";

// pour ajouter une commande
export const addOrder = async (req, res) => {
  try {
    const { lastname, firstname, email, tel, address, message, remise, delivery, boxsId } = req.body;

   
    if (!lastname.trim() || !firstname.trim() || !email.trim() || !tel.trim() || !address.trim()) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs." });
    }

    const parsedBoxsId = Array.isArray(boxsId) ? boxsId : JSON.parse(boxsId);

    const numberOrder = Math.floor(Math.random() * 10000);
    let totalPrice = 0;

    const boxs = await Promise.all(parsedBoxsId.map(oneBox => Box.findById(oneBox)));

    boxs.forEach(box => {
      totalPrice += box.price.amount;
    });

    const newOrder = new Order({
      visitor: {
        lastname,
        firstname,
        email,
        tel,
        address,
      },
      message,
      totalPrice,
      numberOrder,
      boxsId: parsedBoxsId,
      remise,
      delivery,
    });

    await newOrder.save();
    res.status(200).json({ message: "Commande bien enregistrée." });

  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Impossible de créer la commande." });
  }
};
// pour récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
   
   try {
      const orders = await Order.find({})
      res.status(200).json(orders)
   } catch (e) {
      res.status(200).json({message: "Impossible de récupérer toutes les commandes."})
   }
}
 
// pour récuperer une seule commande
export const getOneOrder = async (req,res) => {
   try {
      
      // paramètre dynamique pour récuperer un seul élément 
      const {id} = req.params
      
      const order = await Order.findById(id)
      
      res.status(200).json(order)
      
   } catch (e) {
      res.status(400).json({message: "Impossible de récuperer cette commande."})
   }
}

// pour changer le status
export const changeStatus = async (req, res) => {
   
   try {
      const {id} = req.params;
   
      const {status} = req.body;
      
      // sécurité
      if(status !== "refused" && status !== "accepted" && status !== "pending"){
         return res.status(400).json({message: "Choix invalide."})
      }
      
      
      await Order.findByIdAndUpdate(id, {status})
      
      res.status(200).json({message: "Le statut a bien été changé."})
      
      
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Impossible de changer le statut."})
   }
}

// pour supprimer une commander
export const deleteOrder = async (req, res) => {
   try {
      
      const {id} = req.params;
      
      await Order.findByIdAndDelete(id)
      
      res.status(200).json({message: "Commande supprimée."})
      
   } catch (e) {
      
      res.status(400).json({message: "Impossible de supprimer cette commande."})
   }
}

