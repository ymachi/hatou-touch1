import Estimate from "../models/estimateModel.js";
import { sendStatusEmail } from "../utils/sendMail.js";


export const createEstimate = async (estimateData) => {
  const {
    lastname, firstname, email, tel, address,
    invited, event, eventDate, budget, compagny, message, userId
  } = estimateData;

  if (
    !lastname?.trim() || !firstname?.trim() || !email?.trim() || !tel?.trim() ||
    !address?.trim() || !event?.trim() || !eventDate?.trim() ||
    !invited || invited <= 0 || !budget || budget <= 0
  ) {
    throw new Error("Veuillez remplir correctement tous les champs.");
  }

  const newEstimate = new Estimate({
    lastname,
    firstname,
    email,
    tel,
    address,
    invited,
    event,
    eventDate,
    budget,
    compagny,
    message,
    userId
  });

  return await newEstimate.save();
};

export const fetchAllEstimates = async () => {
  return await Estimate.find({}).sort({ createdAt: -1 });
};

export const updateEstimateStatus = async (id, status) => {
  const estimate = await Estimate.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!estimate) throw new Error("Devis introuvable.");
  if (!estimate.email || !estimate.firstname) throw new Error("Informations utilisateur manquantes.");

  await sendStatusEmail({
    email: estimate.email,
    firstname: estimate.firstname,
    status,
    estimate,
  });

  return estimate;
};

export const removeEstimate = async (id) => {
  return await Estimate.findByIdAndDelete(id);
};

export const getEstimatesByUserId = async (userId) => {
  return await Estimate.find({ userId }).sort({ createdAt: -1 });
};
