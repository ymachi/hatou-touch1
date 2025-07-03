import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext'
import HomeButton from '../components/HomeButton';
import '../css/boxs.css';

const BoxMixte = () => {
  const [toggle, setToggle] = useState(false);
  const {addToCart} = useCart();
  const handleDisplay = () => {
    setToggle(!toggle);
  };

  const [boxs, setBoxs] = useState([]);
  const [checkedItems, setCheckedItems] = useState({}); 

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
    const filteredBoxs = boxs.filter(box => box.category === 'Box Mixte');
    setFilteredBoxs(filteredBoxs);
  }, [boxs]);

 
  const handleCheckboxChange = (boxId, ingredient) => {
    setCheckedItems(prevState => {
      const currentBox = prevState[boxId] || [];
      if (currentBox.includes(ingredient)) {
        return {
          ...prevState,
          [boxId]: currentBox.filter(item => item !== ingredient),
        };
      } else {
        return {
          ...prevState,
          [boxId]: [...currentBox, ingredient],
        };
      }
    });
  };

  
  const isValidSelection = boxId => {
    const currentBox = checkedItems[boxId] || [];
    return currentBox.length === 2 || currentBox.length === 4;
  };
  
  const handleAddToCart = (box) => {
    addToCart(box);
    toast.success('Box bien ajouté au panier !');
  };

  return (
    <main>
      <div className="boxs-container">
        <HomeButton/>
        <article className="intro-boxs">
          <h1 className="title-boxs">Nos Boxs Mixtes</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
          </p>
        </article>
        <section className="cards-boxs">
          {filteredBoxs.map((box, index) => (
            <article className="card-box" key={index}>
              <h2 className="title-boxs2">{box.name}</h2>
              <figure>
                <img src={`http://aminatadiawara.ide.3wa.io:9000/img/${box.image}`} alt={box.name} className="img-responsive" />
                <figcaption></figcaption>
              </figure>
              <ul>
                <li>
                  <button className="display-choices" onClick={handleDisplay}>Appuyer pour voir les choix</button>
                  <form className="multiple-choices" action="#" style={{ display: toggle ? 'block' : 'none' }}>
                    <ul className="list-choices">
                      {box.ingredients &&
                        box.ingredients.map((ingredient, idx) => (
                          <li key={idx}>
                            <label htmlFor={`ingredient-${idx}`}>
                              <input
                                type="checkbox"
                                id={`ingredient-${idx}`}
                                value={ingredient}
                                onChange={() => handleCheckboxChange(box._id, ingredient)}
                                checked={checkedItems[box._id]?.includes(ingredient) || false}/> 
                              {ingredient}
                            </label>
                          </li>
                        ))}
                    </ul>
                  </form>
                </li>
                <li>{box.description}</li>
                <li>{box.price.amount} {box.price.currency}</li>
              </ul>
              <div className="button-boxs">
                <button onClick={() =>handleAddToCart(box)} className={isValidSelection(box._id) ? '' : 'disabled'}>Ajouter au panier</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default BoxMixte;
