import { jest } from "@jest/globals";

// 1. On prépare tous les mocks
const saveMock = jest.fn();
const findMock = jest.fn();
const findByIdAndUpdateMock = jest.fn();
const findByIdAndDeleteMock = jest.fn();
const sendMailMock = jest.fn();

// 2. Mock du modèle
jest.unstable_mockModule("../models/estimateModel.js", () => {
  const FakeEstimate = function (data) {
    Object.assign(this, data);
    this.save = saveMock;
  };

  FakeEstimate.find = findMock;
  FakeEstimate.findByIdAndUpdate = findByIdAndUpdateMock;
  FakeEstimate.findByIdAndDelete = findByIdAndDeleteMock;

  return {
    default: FakeEstimate
  };
});

// 3. Mock de sendMail
jest.unstable_mockModule("../utils/sendMail.js", () => ({
  sendStatusEmail: sendMailMock
}));

// 4. Import après mocks
const {
  createEstimate,
  fetchAllEstimates,
  updateEstimateStatus,
  removeEstimate,
  getEstimatesByUserId
} = await import("../services/estimateService.js");

const { sendStatusEmail } = await import("../utils/sendMail.js");
const { default: Estimate } = await import("../models/estimateModel.js");

// 5. Données de test
const validEstimate = {
  lastname: "Diawara",
  firstname: "Aminata",
  email: "amina@test.com",
  tel: "0600000000",
  address: "Paris",
  invited: 40,
  event: "Anniversaire",
  eventDate: "2026-01-01",
  budget: 500,
  compagny: "Amina Corp",
  message: "Merci !",
  userId: "user123"
};

describe("estimateService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createEstimate", () => {
    it("crée un devis valide", async () => {
      saveMock.mockResolvedValue(validEstimate);
      const result = await createEstimate(validEstimate);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(validEstimate);
    });

    it("échoue si un champ est vide", async () => {
      const invalid = { ...validEstimate, lastname: "" };

      await expect(createEstimate(invalid)).rejects.toThrow("Veuillez remplir correctement tous les champs.");
    });
  });

  describe("fetchAllEstimates", () => {
    it("récupère tous les devis triés", async () => {
      const sortMock = jest.fn().mockReturnValue([validEstimate]);
      findMock.mockReturnValue({ sort: sortMock });

      const result = await fetchAllEstimates();

      expect(findMock).toHaveBeenCalled();
      expect(result).toEqual([validEstimate]);
    });
  });

  describe("updateEstimateStatus", () => {
    it("met à jour le statut et envoie un mail", async () => {
      const updated = { ...validEstimate, status: "Accepté" };
      findByIdAndUpdateMock.mockResolvedValue(updated);

      const result = await updateEstimateStatus("id123", "Accepté");

      expect(findByIdAndUpdateMock).toHaveBeenCalledWith("id123", { status: "Accepté" }, { new: true });
      expect(sendMailMock).toHaveBeenCalledWith({
        email: updated.email,
        firstname: updated.firstname,
        status: "Accepté",
        estimate: updated
      });
      expect(result).toEqual(updated);
    });

    it("échoue si le devis n’existe pas", async () => {
      findByIdAndUpdateMock.mockResolvedValue(null);

      await expect(updateEstimateStatus("badId", "Refusé")).rejects.toThrow("Devis introuvable.");
    });
  });

  describe("removeEstimate", () => {
    it("supprime un devis par ID", async () => {
      findByIdAndDeleteMock.mockResolvedValue("OK");

      const result = await removeEstimate("deleteId");

      expect(findByIdAndDeleteMock).toHaveBeenCalledWith("deleteId");
      expect(result).toBe("OK");
    });
  });

  describe("getEstimatesByUserId", () => {
    it("récupère les devis liés à un utilisateur", async () => {
      const sortMock = jest.fn().mockReturnValue([validEstimate]);
      findMock.mockReturnValue({ sort: sortMock });

      const result = await getEstimatesByUserId("user123");

      expect(findMock).toHaveBeenCalledWith({ userId: "user123" });
      expect(result).toEqual([validEstimate]);
    });
  });
});
