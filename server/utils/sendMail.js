import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendStatusEmail = async ({ email, firstname, status, estimate }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
  });

  const isAccepted = status === "accepted";
  const statusText = isAccepted ? "acceptée ✅" : "refusée ❌";

  const html = `
    <p>Bonjour ${firstname},</p>
    <p>Votre demande de devis a été <strong>${statusText}</strong>.</p>

    <h4>Détails de la demande :</h4>
    <ul>
      <li><strong>Événement :</strong> ${estimate.event}</li>
      <li><strong>Date :</strong> ${new Date(estimate.eventDate).toLocaleDateString()}</li>
      <li><strong>Invités :</strong> ${estimate.invited}</li>
      <li><strong>Budget :</strong> ${estimate.budget} €</li>
      <li><strong>Message :</strong> ${estimate.message || "—"}</li>
    </ul>

    ${
      isAccepted
        ? `<p><strong>Prochaine étape :</strong> Un acompte vous sera demandé afin de confirmer votre commande. Vous recevrez les instructions de paiement très prochainement.</p>`
        : ""
    }

    <p>Merci de votre confiance,<br/>Hatou'Touch</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL,
    to: email,
    subject: `Mise à jour de votre devis - Hatou'Touch`,
    html,
  });
};
