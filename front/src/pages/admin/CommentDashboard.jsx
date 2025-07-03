import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const CommentDashboard = () => {
  const [comments, setComments] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("/api/avis");
        setComments(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la récupération des commentaires.");
      }
    };

    fetchComments();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/avis/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression du commentaire.");
      }
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="gestion-avis">
          <article className="intro">
            <h1>Gestion des avis</h1>
            <p>
              Retrouvez ici tous les avis publiés. Vous pouvez les consulter ou les supprimer selon leur pertinence.
            </p>
          </article>

          <article className="avis">
            <table>
              <thead>
                <tr>
                  <th>Nom utilisateur</th>
                  <th>Commentaire</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(comment => (
                  <tr key={comment.id}>
                    <td>{comment.firstname} {comment.lastname}</td>
                    <td>{comment.content}</td>
                    <td>{comment.rating}</td>
                    <td>{new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}</td>
                    <td>
                      <button className="button-action" onClick={() => handleDelete(comment.id)}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </main>
    </div>
  );
};

export default CommentDashboard;
