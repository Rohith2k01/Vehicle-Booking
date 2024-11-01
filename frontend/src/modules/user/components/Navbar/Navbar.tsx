// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaUserCircle } from 'react-icons/fa'; // For profile icon

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          {/* <img src="/logo.jpg" alt="Logo" className={styles.logoImage} /> */}
          <span className={styles.logoText}>CAR RENTAL</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/">Dashboard</Link>
        <Link href="/">Contact</Link>
      </div>
      <div className={styles.profile}>
        <FaUserCircle className={styles.profileIcon} onClick={handleDropdownToggle} />
        {dropdownOpen && (
          <div className={styles.dropdownMenu}>
            <Link href="/user/RegistrationForm">Sign In</Link>
            <Link href="/user/RegistrationForm">Sign Out</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
