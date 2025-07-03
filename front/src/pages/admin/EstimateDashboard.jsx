import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const EstimateDashboard = () => {
  const [estimate, setEstimate] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const res = await axios.get("/api/estimates", {
          headers: token(), // ✅ Ajout du token ici
        });
        setEstimate(res.data);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la récupération des devis.");
      }
    };

    fetchEstimates();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce devis ?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/estimates/delete/${id}`, {
          headers: token(), // ✅ Ajout du token ici
        });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression du devis.");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(
        `/api/estimates/change-status/${id}`,
        { status },
        { headers: token() } // ✅ Ajout du token ici
      );
      setEstimate((prevEstimates) =>
        prevEstimates.map((est) =>
          est._id === id ? { ...est, status } : est
        )
      );
      toast.success(res.data.message);
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du changement de statut.");
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="gestion-orders">
          <article className="intro">
            <h1>Gestion des devis</h1>
            <p>
              Ici, vous pouvez visualiser les demandes de devis, mettre à jour leur statut ou les supprimer si nécessaire.
            </p>
          </article>

          <article className="orders">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Événement</th>
                    <th>Date</th>
                    <th>Invités</th>
                    <th>Budget</th>
                    <th>Message</th>
                    <th>Statut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {estimate.map((est) => (
                    <tr key={est._id}>
                      <td>{est.firstname}</td>
                      <td>{est.lastname}</td>
                      <td>{est.email}</td>
                      <td>{est.tel}</td>
                      <td>{est.address}</td>
                      <td>{est.event}</td>
                      <td>{est.eventDate?.slice(0, 10)}</td>
                      <td>{est.invited}</td>
                      <td>{est.budget}</td>
                      <td>{est.message}</td>
                      <td>
                        <select
                          className={`status-select ${est.status}`}
                          value={est.status}
                          onChange={(e) => handleStatusChange(est._id, e.target.value)}
                        >
                          <option value="pending">En attente</option>
                          <option value="accepted">Accepté</option>
                          <option value="refused">Refusé</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="button-action"
                          onClick={() => handleDelete(est._id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default EstimateDashboard;
