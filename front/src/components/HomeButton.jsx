import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/icofont2/icofont.css';


const HomeButton = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); 
  };

  return (
    <button className="home-button" onClick={handleHomeClick}>
      <i class="icofont-arrow-left"></i>
    </button>
  );
};

export default HomeButton;
