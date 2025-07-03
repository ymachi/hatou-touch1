import { useState, useEffect } from 'react';
import axios from 'axios';
import Video from "../components/Video";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import '../css/style.css';
import '../css/gallery.css';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await axios.get('/api/gallery');
        setGalleries(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchGalleries();
  }, []);

  const slides = galleries.map(gallery => ({
    src: `http://localhost:9000/img/${
      typeof gallery.image === 'string' ? gallery.image : gallery.image?.src
    }`,
  }));

  return (
    <>
      <main>
        <div className="gallery-container">
          <article className="intro-gallery">
            <h1 className="title-gallery">NOS RÉALISATIONS</h1>
             <div className="underline"></div>
            <p>
              Voici quelqu’une de nos réalisations, chacune d’entre elle est unique et a été réalisée sur mesure en fonction des goûts et du thème de l’événement de nos clients.
            </p>
            <Video />
          </article>

          <section className="gallery">
            {slides.map((slide, i) => (
              <figure className="abs" key={i}>
                <img
                  src={slide.src}
                  alt={`Réalisation ${i + 1}`}
                  className="img-responsive"
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </figure>
            ))}
          </section>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            index={index}
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
          />
        </div>
      </main>
    </>
  );
};

export default Gallery;
