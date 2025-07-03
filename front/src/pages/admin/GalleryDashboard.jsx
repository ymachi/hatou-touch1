import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const GalleryDashboard = () => {
  const [images, setImages] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("/api/gallery");
        setImages(res.data); 
      } catch (e) {
        console.log(e)
        toast.error("Erreur lors de la récupération des images.");
      }
    };

    fetchGallery();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette image ?"); 
    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/gallery/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression de l'image.");
      }
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="gestion-orders">
          <article className="intro">
            <h1>Gestion des photos</h1>
            <p>
              Ici, vous pouvez visualiser, ajouter ou supprimer les images de vos réalisations. Cliquez sur "Supprimer" pour retirer une image.
            </p>
          </article>
          <article className="orders">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Alt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image) => ( 
                  <tr key={image._id}>
                    <td>
                      <img
                        src={`http://localhost:9000/img/${image.image.src}`}

                        alt={image.image.alt}
                        className="img-responsive-dashboard"
                      />
                    </td>
                    <td>{image.image.alt}</td> 
                    <td>
                      <button
                        className="button-action"
                        onClick={() => handleDelete(image._id)}
                      >
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

export default GalleryDashboard;
