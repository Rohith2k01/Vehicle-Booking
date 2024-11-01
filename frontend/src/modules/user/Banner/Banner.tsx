import React from 'react';
import styles from './Banner.module.css'; // Importing the CSS module

const Banner: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <img 
        src="/Banner1.gif" // Path to the GIF inside the public folder
        alt="Banner GIF"
        className={styles.bannerGif} // Applying CSS class for styling
      />
    </div>
  );
};

export default Banner;


