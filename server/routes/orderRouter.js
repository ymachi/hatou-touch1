import express from "express";
import {addOrder, 
getAllOrders, 
getOneOrder,
changeStatus,
deleteOrder
} from "../controllers/orderController.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";


const orderRouter = express.Router();

// pour ajouter une nouvelle comande
orderRouter.post("/new", addOrder);

// pour récuperer toutes les commandes
orderRouter.get("/", isLogged, isAuthorized(["admin"]),getAllOrders);

// pour récuperer une seule commande
orderRouter.get("/:id", isLogged, isAuthorized(["admin"]), getOneOrder)

// pour changer le status 
orderRouter.put("/change-status/:id", isLogged, isAuthorized(["admin"]), changeStatus);

// pour supprimer une commande 
orderRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]),deleteOrder)

export default orderRouter;

