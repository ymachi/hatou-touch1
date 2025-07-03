import express from "express";
import {
  addEstimate,
  getAllEstimates,
  changeStatus,
  deleteEstimate,
  getUserEstimates
} from "../controllers/estimateController.js";
import { isLogged, isAuthorized } from "../middlewares/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const estimateRouter = express.Router();

// pour ajouter une demande de devis
estimateRouter.post("/new",  addEstimate);

// pour récuperer tous les devis
estimateRouter.get("/", isLogged, isAuthorized(["admin"]), getAllEstimates);

// pour changer le status 
estimateRouter.put("/change-status/:id", isLogged, isAuthorized(["admin"]), changeStatus);

// pour supprimer le devis
estimateRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]), deleteEstimate);

// pour récupérer les devis du user connecté
estimateRouter.get("/user", verifyToken, getUserEstimates);

export default estimateRouter;