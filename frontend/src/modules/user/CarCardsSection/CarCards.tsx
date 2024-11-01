import React from 'react';
import styles from './CarCards.module.css';

interface CarCardProps {
  image: string;
  model: string;
  price: string;
  features: {
    passengers: string;
    transmission: string;
    fuelType: string;
  };
  onRentNow: () => void; // Callback for "Rent Now" button click
}

const CarCard: React.FC<CarCardProps> = ({ image, model, price, features, onRentNow }) => {
  return (
    <div className={styles.carCard}>
      <img src={image} alt={model} className={styles.carImage} />
      <div className={styles.carDetails}>
        <h3>{model}</h3>
        <p className={styles.price}>${price} / day</p>
        <div className={styles.features}>
          <span>{features.passengers} Person</span>
          <span>{features.transmission}</span>
          <span>{features.fuelType}</span>
        </div>
        
        <button className={styles.rentButton} onClick={onRentNow}>
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;


// import React from 'react';
// import styles from './CarCards.module.css';

// interface CarCardProps {
//   image?: string; // Make image optional
//   model?: string; // Make model optional
//   price?: string; // Make price optional
//   features?: {
//     passengers?: string; // Make features optional
//     transmission?: string;
//     fuelType?: string;
//   };
//   onRentNow: () => void; // Callback for "Rent Now" button click
// }

// const CarCard: React.FC<CarCardProps> = ({
//   image = 'defaultImageUrl.jpg', // Provide a fallback image URL
//   model = 'Unknown Model', // Fallback for model name
//   price = 'N/A', // Fallback for price
//   features = { passengers: 'N/A', transmission: 'N/A', fuelType: 'N/A' }, // Default features
//   onRentNow,
// }) => {
//   return (
//     <div className={styles.carCard}>
//       <img src={image} alt={model} className={styles.carImage} />
//       <div className={styles.carDetails}>
//         <h3>{model}</h3>
//         <p className={styles.price}>${price} / day</p>
//         <div className={styles.features}>
//           <span>{features.passengers} Person</span>
//           <span>{features.transmission}</span>
//           <span>{features.fuelType}</span>
//         </div>
        
//         <button className={styles.rentButton} onClick={onRentNow}>
//           Rent Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarCard;






