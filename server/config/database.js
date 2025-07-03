import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

// permet de connecter à une base de données existantes
export const connectDB = mongoose.connect(`${process.env.MONGO_URI}`)

// si la connexion fonctionne
mongoose.connection.on("open", () =>{
   console.log(`Database connexion etablished`)
})

// si la connexion échoue 

mongoose.connection.on("error", () => {
   console.log(`Error, impossible to connect with DB`)
})