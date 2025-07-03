import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify';
import HomeButton from '../components/HomeButton';

import '../css/boxs.css';

const BoxClassique = () => {
  const [boxs, setBoxs] = useState([]);
  const {addToCart} = useCart();

  useEffect(() => {
    const fetchBoxs = async () => {
      try {
        const res = await axios.get('/api/boxs');
        setBoxs(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchBoxs();
  }, []);

 const [filteredBoxs, setFilteredBoxs] = useState([]);
 
  useEffect(() => {
    const filteredBoxs = boxs.filter(box => box.category === 'boxs classiques');
    setFilteredBoxs(filteredBoxs);
  }, [boxs]); 


  const handleAddToCart = (box) => {
    addToCart(box);
    toast.success('Box bien ajouté au panier !');
  };
  
  
  return (
    <>
      <main>
     
        <div className="boxs-container">
         <HomeButton/>
          <article className="intro-boxs">
            <h1 className="title-boxs">Nos boxs classiques</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
            </p>
          </article>
          <section className="cards-boxs">
            {filteredBoxs.map((box) => (
              <article className="card-box" key={box._id}>
                <h2 className="title-boxs2">{box.name}</h2>
                <figure>
                  <img src={`http://aminatadiawara.ide.3wa.io:9000/img/${box.image}`} alt={box.name} className="img-responsive" />
                  <figcaption></figcaption>
                </figure>
                <ul>
                  <li>{box.description}</li>
                  <li>{box.price.amount} {box.price.currency}</li>
                </ul>
                <div className="button-boxs">
                  <button onClick={() =>handleAddToCart(box)}>Ajouter au panier</button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default BoxClassique;
