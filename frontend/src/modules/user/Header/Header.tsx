// components/Header.tsx
import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>RoadTrip Rentals</h1>
      </div>
      <nav className={styles.nav}>
        <button className={styles.btn}>View cars</button>
        <button className={styles.btnOutline}>Contact us</button>
      </nav>
    </header>
  );
};

export default Header;
