import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const isLogged = (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log("HEADER AUTH:", authToken);

  const token = authToken && authToken.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Vous n'êtes pas authentifié" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Erreur JWT:", err);
      return res.status(403).json({ message: "Token invalide" });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    const user = await User.findByPk(req.userId); // ⚠️ findById -> findByPk

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Vos permissions sont insuffisantes pour accéder à la ressource",
      });
    }

    next();
  };
};
