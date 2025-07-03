import {
  createEstimate,
  fetchAllEstimates,
  updateEstimateStatus,
  removeEstimate,
  getEstimatesByUserId
} from "../services/estimateService.js";


export const addEstimate = async (req, res) => {
  try {
    const estimateData = req.body;

  
    if (req.userId) {
      estimateData.userId = req.userId;
    }

    const saved = await createEstimate(estimateData);
    res.status(201).json({ message: "Demande de devis envoyée avec succès !" });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: e.message || "Erreur lors de l’ajout du devis." });
  }
};


export const getAllEstimates = async (req, res) => {
  try {
    const estimates = await fetchAllEstimates();
    res.status(200).json(estimates);
  } catch (e) {
    res.status(400).json({ message: "Impossible de récupérer les devis." });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const updatedEstimate = await updateEstimateStatus(req.params.id, req.body.status);
    res.status(200).json({ message: "Statut mis à jour avec succès.", updatedEstimate });
  } catch (err) {
    console.error("Erreur dans changeStatus:", err);
    res.status(400).json({ message: err.message });
  }
};

export const deleteEstimate = async (req, res) => {
  try {
    const { id } = req.params;
    await removeEstimate(id);
    res.status(200).json({ message: "Devis supprimé avec succès." });
  } catch (e) {
    res.status(400).json({ message: "Erreur lors de la suppression." });
  }
};

export const getUserEstimates = async (req, res) => {
  try {
    const estimates = await getEstimatesByUserId(req.userId);
    res.status(200).json(estimates);
  } catch (e) {
    res.status(400).json({ message: e.message || "Impossible de récupérer vos devis." });
  }
};

