import express from "express";
import {addContact,
getAllContacts,
getContact,
deleteContact,
changeStatus
} from "../controllers/contactController.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";

const contactRouter = express.Router();

// pour ajouter une demande de contact 
contactRouter.post("/new", addContact);

// pour récupérer toutes les demandes de contacts
contactRouter.get("/", isLogged, isAuthorized(["admin"]) ,getAllContacts);

// pour récuperer un contact 
contactRouter.get("/:id", getContact);

// pour supprimer une demande de contact 
contactRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteContact)

// pour changer le statut 
contactRouter.put("/status/:id", isLogged, isAuthorized(["admin"]) ,changeStatus)

export default contactRouter;