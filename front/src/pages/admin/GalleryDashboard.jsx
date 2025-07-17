import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const GalleryDashboard = () => {
  const [images, setImages] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState("");

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

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFile(e.target.files[0]);
    } else if (e.target.name === "alt") {
      setAlt(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Veuillez choisir une image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("alt", alt);

      const res = await axios.post("/api/gallery/new", formData, { headers: token() });

      toast.success("Image ajoutée avec succès.");
      setShowModal(false);
      setFile(null);
      setAlt("");
      setIsDeleted(!isDeleted); // pour rafraîchir
    } catch (e) {
      console.log(e);
      toast.error("Erreur lors de l'ajout de l'image.");
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="gestion-orders">
          <article className="intro">
            <h1>Gestion des photos</h1>
            <p>
              Ici, vous pouvez visualiser, ajouter ou supprimer les images de vos réalisations.
            </p>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              + Ajouter une photo
            </button>
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

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
              <h2>Ajouter une image</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  <label htmlFor="image">Fichier image</label>
                  <input type="file" name="image" id="image" onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="alt">Texte alternatif</label>
                  <input type="text" name="alt" id="alt" placeholder="ex: Plateau de bouchées salées" onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn">Ajouter</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryDashboard;
