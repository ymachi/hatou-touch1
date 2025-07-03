import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.js"; 
import router from "./routes/router.js";
import {connectDB} from "./config/database.js";
import { syncModels } from "./models/index.js";
import cors from "cors";

const app = express();

// je connecte avec ma database
connectDB;

// pour lire le contenu du fichier 
dotenv.config();

// pour convertir la req.body qui est en json
app.use(express.json()) 

// pour déchiffrer la méthode post
app.use(express.urlencoded({extended:true})) 

// pour prendre tous les dossiers à l'intérieur du dossier public
app.use(express.static("public")) 

app.use(cors({
    origin: "http://localhost:5173"
}));

// j'appelle router.js qui englobe toutes mes routes
app.use("/api", router);

// je connecte avec ma database (Sequelize)
const startServer = async () => {
   try {
      await sequelize.authenticate();
      console.log("Connexion à MySQL réussie !");

      await syncModels();
      
      app.listen(process.env.PORT || 9000, () => {
         console.log(`Server is running: http://localhost:${process.env.PORT || 9000}`);
      });

   } catch (error) {
      console.error("Erreur de connexion à MySQL :", error);
   }
};

startServer();
