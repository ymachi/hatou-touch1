import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const BoxDashboard = () => {
  const navigate = useNavigate();
  const [boxs, setBoxs] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchBoxs = async () => {
      try {
        const res = await axios.get("/api/boxs");
        setBoxs(res.data);
        console.log(res.data);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la récupération des boxs.");
      }
    };

    fetchBoxs();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette box ?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/boxs/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression de la box.");
      }
    }
  };

  return (
    <main className="content">
      <div className="gestion-box">
        <article className="intro">
          <h1>Gestion des boxs</h1>
          <p>Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.</p>
        </article>
        <article className="boxs">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Contenu</th>
                <th>Prix</th>
                <th>Modifier/Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {boxs.map(box => (
                <tr key={box._id}>
                  <td>{box.name}</td>
                  <td>{box.description}</td>
                  <td>{box.price.amount} {box.price.currency}</td>
                  <td>
                    <button className="button-action">
                      <NavLink className="nav-action" to={`/admin/boxs/edit/${box._id}`}>Editer</NavLink>
                    </button>
                    <button className="button-action" onClick={() => handleDelete(box._id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </main>
  );
};

export default BoxDashboard;
