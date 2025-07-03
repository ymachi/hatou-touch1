import express from "express";
import {register, 
login, 
getAllUsers, 
getOneUser, 
updateUser,
changeRole,
resetPassword,
deleteUser, 
checkUser} from "../controllers/userController.js";
import {isLogged, isAuthorized} from "../middlewares/auth.js";


const userRouter = express.Router();

// route pour s'inscrire
userRouter.post("/register", register);

// route pour se connecter
userRouter.post("/login", login);

// route pour récupérer tous les users
userRouter.get("/", isLogged, isAuthorized(["admin"]) ,getAllUsers)

// route pour récupérer un seul user
userRouter.get("/:id", getOneUser)

// pour modifier des informations personnelles
userRouter.put("/edit/:id", isLogged, isAuthorized(["admin", "user"]) ,updateUser)

// pour changer un rôle 
userRouter.put("/change-role/:id", isLogged, isAuthorized(["admin"]) ,changeRole)

// changement de mdp 
userRouter.put("/reset-password",resetPassword)

// pour supprimer un user 
userRouter.delete("/delete/:id", isLogged, isAuthorized(["admin"]) ,deleteUser)

// vérification de l'user connecté
userRouter.get("/check", isLogged, isAuthorized(["admin", "user"]), checkUser)


export default userRouter;