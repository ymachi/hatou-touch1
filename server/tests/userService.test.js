import { jest } from "@jest/globals";

// Mocks
const saveMock = jest.fn();
const findMock = jest.fn();
const findOneMock = jest.fn();
const findByIdMock = jest.fn();
const findByIdAndUpdateMock = jest.fn();
const findByIdAndDeleteMock = jest.fn();
const selectMock = jest.fn();

const compareMock = jest.fn();
const hashMock = jest.fn();
const signMock = jest.fn();

// Mock du modèle User
jest.unstable_mockModule("../models/userModel.js", () => {
  const FakeUser = function (data) {
    Object.assign(this, data);
    this.save = saveMock;
  };

  FakeUser.find = findMock;
  FakeUser.findOne = findOneMock;
  FakeUser.findById = findByIdMock;
  FakeUser.findByIdAndUpdate = findByIdAndUpdateMock;
  FakeUser.findByIdAndDelete = findByIdAndDeleteMock;

  return {
    default: FakeUser
  };
});

// Mock de bcrypt et jwt
jest.unstable_mockModule("bcrypt", () => ({
  compare: compareMock,
  hash: hashMock
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  sign: signMock
}));

// Import des services après les mocks
const {
  registerUser,
  loginUser,
  getAllUsersService,
  getOneUserService,
  updateUserService,
  resetPasswordService,
  changeRoleService,
  deleteUserService,
  checkUserService
} = await import("../services/userService.js");

const { default: User } = await import("../models/userModel.js");
const { compare, hash } = await import("bcrypt");
const { sign } = await import("jsonwebtoken");

// Données de test
const baseUser = {
  lastname: "Diawara",
  firstname: "Aminata",
  email: "amina@test.com",
  password: "Test123#",
  tel: "0600000000",
  address: "Paris",
};

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("inscrit un utilisateur valide", async () => {
      findOneMock.mockResolvedValue(null);
      saveMock.mockResolvedValue(baseUser);

      const result = await registerUser(baseUser);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toMatchObject(baseUser);
    });

    it("échoue si un champ est vide", async () => {
      await expect(registerUser({ ...baseUser, firstname: "" }))
        .rejects.toThrow("Veuillez remplir tous les champs.");
    });

    it("échoue si l'email est déjà utilisé", async () => {
      findOneMock.mockResolvedValue({ email: baseUser.email });

      await expect(registerUser(baseUser))
        .rejects.toThrow("Cet email est déjà enregistré.");
    });

    it("échoue si le mot de passe est invalide", async () => {
      findOneMock.mockResolvedValue(null);

      await expect(registerUser({ ...baseUser, password: "azerty" }))
        .rejects.toThrow("Le mot de passe choisi ne respecte pas les conditions.");
    });
  });

  describe("loginUser", () => {
    it("connecte un utilisateur valide", async () => {
      const fakeUser = {
        ...baseUser,
        password: "hashed",
        toObject: () => ({ ...baseUser, password: undefined })
      };

      findOneMock.mockResolvedValue(fakeUser);
      compareMock.mockResolvedValue(true);
      signMock.mockReturnValue("FAKE_TOKEN");

      const result = await loginUser({ email: baseUser.email, password: baseUser.password });

      expect(result).toMatchObject({
        email: baseUser.email,
        token: "FAKE_TOKEN"
      });
    });

    it("échoue si l'email est inconnu", async () => {
      findOneMock.mockResolvedValue(null);

      await expect(loginUser({ email: baseUser.email, password: baseUser.password }))
        .rejects.toThrow("Aucun utilisateur enregistré avec cet email.");
    });

    it("échoue si le mot de passe est incorrect", async () => {
      findOneMock.mockResolvedValue({
        ...baseUser,
        password: "hashed",
        toObject: () => ({})
      });

      compareMock.mockResolvedValue(false);

      await expect(loginUser({ email: baseUser.email, password: "wrong" }))
        .rejects.toThrow("Mot de passe incorrect.");
    });
  });

  describe("getAllUsersService", () => {
    it("retourne tous les utilisateurs sans mot de passe", async () => {
      findMock.mockReturnValue({ select: selectMock });
      selectMock.mockResolvedValue([{ email: "amina@test.com" }]);

      const result = await getAllUsersService();
      expect(result).toEqual([{ email: "amina@test.com" }]);
    });
  });

  describe("getOneUserService", () => {
    it("retourne un utilisateur par ID", async () => {
      findByIdMock.mockResolvedValue(baseUser);

      const result = await getOneUserService("123");
      expect(result).toEqual(baseUser);
    });
  });

  describe("updateUserService", () => {
    it("met à jour un utilisateur", async () => {
      await updateUserService("123", {
        email: "new@test.com",
        tel: "0707070707",
        address: "Nouvelle adresse"
      });

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith("123", {
        email: "new@test.com",
        tel: "0707070707",
        address: "Nouvelle adresse"
      });
    });

    it("échoue si un champ est vide", async () => {
      await expect(updateUserService("123", {
        email: "",
        tel: "",
        address: ""
      })).rejects.toThrow("Veuillez remplir tous les champs.");
    });
  });

  describe("resetPasswordService", () => {
    it("met à jour le mot de passe", async () => {
      const user = { password: "old", save: saveMock };
      findOneMock.mockResolvedValue(user);
      hashMock.mockResolvedValue("newHashed");

      await resetPasswordService({ token: "123", email: baseUser.email, password: baseUser.password });

      expect(hashMock).toHaveBeenCalled();
      expect(saveMock).toHaveBeenCalled();
    });

    it("échoue si le mot de passe est vide", async () => {
      await expect(resetPasswordService({ token: "123", email: "a@a.com", password: "" }))
        .rejects.toThrow("Veuillez entrer un mot de passe");
    });

    it("échoue si le mot de passe est invalide", async () => {
      await expect(resetPasswordService({ token: "123", email: "a@a.com", password: "azerty" }))
        .rejects.toThrow("Le mot de passe ne respecte pas les conditions");
    });

    it("échoue si le token est invalide", async () => {
      findOneMock.mockResolvedValue(null);

      await expect(resetPasswordService({ token: "123", email: "a@a.com", password: "Test123#" }))
        .rejects.toThrow("Token invalide ou utilisateur introuvable");
    });
  });

  describe("changeRoleService", () => {
    it("change le rôle en admin", async () => {
      await changeRoleService("id", "admin");

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith("id", { role: "admin" });
    });

    it("échoue si le rôle est invalide", async () => {
      await expect(changeRoleService("id", "root")).rejects.toThrow("Choix invalide");
    });
  });

  describe("deleteUserService", () => {
    it("supprime un autre utilisateur", async () => {
      await deleteUserService("id1", "id2");

      expect(findByIdAndDeleteMock).toHaveBeenCalledWith("id1");
    });

    it("échoue si on veut se supprimer soi-même", async () => {
      await expect(deleteUserService("id1", "id1"))
        .rejects.toThrow("Vous ne pouvez pas supprimer votre propre compte (admin).");
    });
  });

  describe("checkUserService", () => {
    it("retourne l'utilisateur connecté", async () => {
      findByIdMock.mockReturnValue({
        select: jest.fn().mockResolvedValue(baseUser)
      });

      const result = await checkUserService("123");
      expect(result).toEqual(baseUser);
    });

    it("échoue si utilisateur introuvable", async () => {
      findByIdMock.mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await expect(checkUserService("invalide"))
        .rejects.toThrow("Utilisateur non trouvé.");
    });
  });
});
