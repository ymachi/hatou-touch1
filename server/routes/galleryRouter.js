import express from "express";
import {addGallery, getAllGallery, deleteGallery} from "../controllers/galleryController.js";
import upload from "../middlewares/multer.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";

const galleryRouter = express.Router();

// pour ajouter une photo 
galleryRouter.post("/new", isLogged, isAuthorized(["admin"]), upload.single("image"), addGallery);

// pour récupérer les images
galleryRouter.get("/", getAllGallery)

// pour supprimer une image 
galleryRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]) ,deleteGallery)


export default galleryRouter;