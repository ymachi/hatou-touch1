import React from 'react';
import '../css/video.css';

const Video = () => {
  return (
    <section className="video-container">
      <video className="responsive-video" muted loop autoPlay>
        <source src="video/video3.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </section>
  );
}

export default Video;
