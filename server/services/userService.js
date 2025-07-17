import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// regex sécurité mot de passe
const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/;

// inscription
export const registerUser = async ({ lastname, firstname, email, password, tel, address }) => {
  if (!lastname || !firstname || !email || !password || !tel || !address) {
    throw new Error("Veuillez remplir tous les champs.");
  }

  const verifEmail = await User.findOne({ where: { email } });
  if (verifEmail) {
    throw new Error("Cet email est déjà enregistré.");
  }

  if (!checkPwd.test(password)) {
    throw new Error("Le mot de passe choisi ne respecte pas les conditions.");
  }

  
  const newUser = await User.create({
    lastname,
    firstname,
    email,
    password, 
    tel,
    address,
  });

  return newUser;
};

// connexion
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Aucun utilisateur enregistré avec cet email.");
  }

  console.log("Mot de passe saisi :", password);
  console.log("Mot de passe enregistré (hashé) :", user.password);

  const isValidPwd = await bcrypt.compare(password, user.password);
  if (!isValidPwd) {
    throw new Error("Mot de passe incorrect.");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const { password: _, ...userWithoutPwd } = user.toJSON();

  return {
    ...userWithoutPwd,
    token,
  };
};

// récupérer tous les utilisateurs (sans mdp)
export const getAllUsersService = async () => {
  return await User.findAll({ attributes: { exclude: ["password"] } });
};

// récupérer un utilisateur par ID
export const getOneUserService = async (id) => {
  return await User.findByPk(id);
};

// modifier email, téléphone, adresse
export const updateUserService = async (id, { email, tel, address }) => {
  if (!email || !tel || !address) {
    throw new Error("Veuillez remplir tous les champs.");
  }

  await User.update({ email, tel, address }, { where: { id } });
};

// réinitialiser le mot de passe
export const resetPasswordService = async ({ token, email, password }) => {
  if (!password.trim()) {
    throw new Error("Veuillez entrer un mot de passe");
  }

  if (!checkPwd.test(password)) {
    throw new Error("Le mot de passe ne respecte pas les conditions");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.update({ password: hashedPassword }, { where: { id: user.id } });
};

// changer le rôle de l'utilisateur
export const changeRoleService = async (id, role) => {
  if (!["user", "admin"].includes(role)) {
    throw new Error("Choix invalide");
  }

  await User.update({ role }, { where: { id } });
};

// supprimer un utilisateur (sauf soi-même)
export const deleteUserService = async (id, currentUserId) => {
  if (id === currentUserId) {
    throw new Error("Vous ne pouvez pas supprimer votre propre compte (admin).");
  }

  await User.destroy({ where: { id } });
};

// vérifier l'utilisateur connecté
export const checkUserService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé.");
  }

  return user;
};
