import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { token } from "../context/token";
import "../css/profil.css";

const Profil = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/check", {
          headers: token(),
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Erreur récupération profil :", err);
        toast.error("Erreur lors de la récupération du profil.");
      }
    };

    const fetchEstimates = async () => {
      try {
        const res = await axios.get("/api/estimates/user", {
          headers: token(),
        });
        setEstimates(res.data);
      } catch (err) {
        toast.error("Erreur lors de la récupération des devis.");
      }
    };

    if (user && user.token) {
      fetchProfile();
      fetchEstimates();
    }
  }, [user]);

  if (!profile) return <p>Chargement...</p>;

  return (
    <main className="profil-page">
      <h1 className="profil-title">Mon profil</h1>
      <section className="profil-info">
        <h2>Informations personnelles</h2>
        <p><strong>Nom :</strong> {profile.lastname}</p>
        <p><strong>Prénom :</strong> {profile.firstname}</p>
        <p><strong>Email :</strong> {profile.email}</p>
        <p><strong>Téléphone :</strong> {profile.tel}</p>
        <p><strong>Adresse :</strong> {profile.address}</p>
      </section>

      <section className="profil-estimates">
        <h2>Mes demandes de devis</h2>
        {estimates.length === 0 ? (
          <p>Aucune demande de devis pour le moment.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Événement</th>
                <th>Invités</th>
                <th>Budget</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((est) => (
                <tr key={est._id}>
                  <td>{new Date(est.createdAt).toLocaleDateString()}</td>
                  <td>{est.event}</td>
                  <td>{est.invited}</td>
                  <td>{est.budget} €</td>
                  <td>{est.status === "pending" ? "En attente" : est.status === "accepted" ? "Accepté" : "Refusé"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Profil;
