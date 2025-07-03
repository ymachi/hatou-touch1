import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", { headers: token() });
        setOrders(res.data);
      } catch (e) {
        toast.error("Erreur lors de la récupération des commandes.");
      }
    };

    fetchOrders();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette commande ?");

    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/orders/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression de la commande.");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`/api/orders/change-status/${id}`, { status }, { headers: token()});
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
      toast.success(res.data.message);
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du changement de statut.");
    }
  };

  return (
    <main className="content">
      <div className="gestion-orders">
        <article className="intro">
          <h1>Gestion des commandes</h1>
          <p>
            Nihil imperdiet doming id quod mazim placerat facer possim
            assum. Typi non habent claritatem insitam; est usus legentis
            in iis qui facit eorum claritatem.
          </p>
        </article>
        <article className="orders">
          <table>
            <thead>
              <tr>
                <th>N° de commande</th>
                <th>User</th>
                 <th>Total Prix</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.numberOrder}</td>
                  <td>{order.visitor.lastname}</td>
                  <td>{order.totalPrice}{}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="refused">Refused</option>
                    </select>
                  </td>
                  <td>
                    <button className="button-action" onClick={() => handleDelete(order._id)}>Supprimer</button>
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

export default OrderDashboard;
