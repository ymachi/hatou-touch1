import { useState } from 'react';
import axios from 'axios';
import { token } from '../../context/token';
import { toast } from 'react-toastify';
import './cssadmin/dashboard.css';

const AddGallery = () => {
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState("");

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

      console.log(res.data.message);
      toast.success("Image ajoutée avec succès.");
    } catch (e) {
      console.log(e);
      toast.error("Erreur lors de l'ajout de l'image.");
    }
  };

  return (
    <div className="admin-page">
      <main className="content">
        <div className="container">
          <section className="intro">
            <h1>Ajouter une photo</h1>
          </section>

          <form className="add-dashboard" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="parentparts">
              <section className="partone">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" onChange={handleChange} />
              </section>

              <section className="partone">
                <label htmlFor="alt">Texte alternatif (accessibilité)</label>
                <input type="text" id="alt" name="alt" placeholder="ex: Plateau de bouchées salées" onChange={handleChange} />
              </section>
            </div>

            <input type="submit" value="Ajouter" />
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddGallery;
