// components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About Us */}
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>
            We offer top-notch car rental services with a variety of vehicles available for every need. 
            Our goal is to make renting a car as smooth and easy as possible.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul className={styles.links}>
            <li><a href="/about">About Us</a></li>
            <li><a href="/cars">Our Vehicles</a></li>
            <li><a href="/bookings">My Bookings</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> support@carrental.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Address:</strong> 123 Rental St., City, Country</p>
        </div>

        {/* Social Media */}
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Car Rental. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
