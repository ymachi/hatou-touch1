import express from "express";
import {addBox, 
getAllBoxs,
getOneBox,
getBoxsByCategory,
editBox,
deleteBox
} from "../controllers/boxController.js";
import upload from "../middlewares/multer.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";

const boxRouter = express.Router();

// route pour ajouter une box
boxRouter.post("/new", isLogged, isAuthorized(["admin"]), upload.single("image"), addBox);

// pour récupérer toutes les boxs 
boxRouter.get("/", getAllBoxs);

// pour récupérer une seule box 
boxRouter.get("/:id", getOneBox);

// pour trier les catégories 
boxRouter.get( "/category",getBoxsByCategory)

// pour modifier une box
boxRouter.put("/edit/:id", isLogged, isAuthorized(["admin"]), upload.single("image"), editBox);

// pour supprimer une box
boxRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]) ,deleteBox);





export default boxRouter;