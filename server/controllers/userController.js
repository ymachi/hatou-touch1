import dotenv from "dotenv";
import {
  registerUser,
  loginUser,
  getAllUsersService,
  getOneUserService,
  updateUserService,
  resetPasswordService,
  changeRoleService,
  deleteUserService,
  checkUserService,
} from "../services/userService.js";

dotenv.config();

// inscription
export const register = async (req, res) => {
  try {
    const { lastname, firstname, email, password, tel, address } = req.body;
    await registerUser({ lastname, firstname, email, password, tel, address });
    res.status(200).json({ message: "Compte créé avec succès." });
  } catch (e) {
    res.status(400).json({ message: e.message || "Erreur lors de l'inscription." });
  }
};

// connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser({ email, password });
    res.status(200).json(data);
  } catch (e) {
    res.status(401).json({ message: e.message || "Impossible de se connecter." });
  }
};

// récupère tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ message: "Impossible de récupérer tous les utilisateurs." });
  }
};

// récupère un seul user
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getOneUserService(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ message: "Impossible de récupérer cet utilisateur." });
  }
};

// pour modifier les données personnelles de user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, tel, address } = req.body;
    await updateUserService(id, { email, tel, address });
    res.status(200).json({ message: "Votre profil a bien été mis à jour" });
  } catch (e) {
    res.status(401).json({ message: e.message || "Impossible de mettre à jour le profil" });
  }
};

// changement du mdp
export const resetPassword = async (req, res) => {
  try {
    const { token, email, password } = req.body;
    await resetPasswordService({ token, email, password });
    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (e) {
    res.status(500).json({ message: e.message || "Erreur lors de la modification du mot de passe" });
  }
};

// changement du rôle
export const changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await changeRoleService(id, role);
    res.status(200).json({ message: "Le rôle a bien été changé." });
  } catch (e) {
    res.status(400).json({ message: e.message || "Impossible de changer le rôle." });
  }
};

// pour supprimer un user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserService(id, req.userId);
    res.status(200).json({ message: "Suppression effectuée" });
  } catch (e) {
    res.status(400).json({ message: e.message || "Suppression impossible." });
  }
};

// pour vérifier qui est l'utilisateur connecté
export const checkUser = async (req, res) => {
  try {
    const user = await checkUserService(req.userId);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ message: "Erreur lors de la vérification." });
  }
};
