import express from "express";
import {addComment, getAllComments, deleteComment} from "../controllers/commentController.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";

const commentRouter = express.Router();

// pour ajouter un nouvel avis 
commentRouter.post("/new", isLogged, isAuthorized(["admin", "user"]), addComment);

// pour récupérer tous les avis 
commentRouter.get("/", getAllComments);

// pour supprimer un avis 
commentRouter.delete("/delete/:id", isLogged, isAuthorized(["admin", "user"]), deleteComment)


export default commentRouter;