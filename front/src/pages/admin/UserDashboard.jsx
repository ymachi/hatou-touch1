import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from '../../context/token';
import './cssadmin/dashboard.css';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users", { headers: token() });
        setUsers(res.data);
      } catch (e) {
        toast.error("Erreur lors de la récupération des utilisateurs.");
      }
    };

    fetchUsers();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/users/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression de l'utilisateur.");
      }
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axios.put(`/api/users/change-role/${id}`, { role }, { headers: token() });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role } : user
        )
      );
      toast.success(res.data.message);
    } catch (e) {
      toast.error("Erreur lors du changement du rôle.");
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="gestion-users">
          <article className="intro">
            <h1>Gestion des clients</h1>
            <p>
              Retrouvez ici la liste des utilisateurs. Vous pouvez modifier leur rôle ou les supprimer si nécessaire.
            </p>
          </article>
          <article className="users">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Numéro</th>
                  <th>Adresse</th>
                  <th>Rôle</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.lastname}</td>
                    <td>{user.firstname}</td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{user.address}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      >
                        <option value="user">Utilisateur</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    </td>
                    <td>
                      <button className="button-action" onClick={() => handleDelete(user._id)}>
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

export default UserDashboard;
