import { jest } from '@jest/globals';

// 1. Création des mocks
const createMock = jest.fn();
const findAllMock = jest.fn();
const destroyMock = jest.fn();

// 2. Mock du modèle Sequelize
jest.unstable_mockModule("../models/comment.model.js", () => ({
  default: {
    create: createMock,
    findAll: findAllMock,
    destroy: destroyMock
  }
}));

// 3. Import du service APRÈS le mock du modèle
const commentService = await import("../services/commentService.js");

describe("commentService", () => {
  beforeEach(() => {
    createMock.mockReset();
    findAllMock.mockReset();
    destroyMock.mockReset();
  });

  describe("createComment", () => {
    it("crée un commentaire valide", async () => {
      const fakeComment = { content: "Super bon !", rating: 5, userId: "123" };
      createMock.mockResolvedValue(fakeComment);

      const result = await commentService.createComment(fakeComment);

      expect(createMock).toHaveBeenCalledWith(fakeComment);
      expect(result).toEqual(fakeComment);
    });

    it("lance une erreur si les champs sont invalides", async () => {
      await expect(
        commentService.createComment({ content: "", rating: 6, userId: "123" })
      ).rejects.toThrow("Champs invalides");
    });
  });

  describe("fetchAllComments", () => {
    it("récupère tous les commentaires", async () => {
      const fakeComments = [{ content: "Bon", rating: 4 }];
      findAllMock.mockResolvedValue(fakeComments);

      const result = await commentService.fetchAllComments();

      expect(findAllMock).toHaveBeenCalled();
      expect(result).toEqual(fakeComments);
    });
  });

  describe("removeComment", () => {
    it("supprime un commentaire par id", async () => {
      destroyMock.mockResolvedValue(1);

      const result = await commentService.removeComment(123);

      expect(destroyMock).toHaveBeenCalledWith({ where: { id: 123 } });
      expect(result).toBe(1);
    });
  });
});
