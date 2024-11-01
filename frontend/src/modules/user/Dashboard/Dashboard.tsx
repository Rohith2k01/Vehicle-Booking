// pages/dashboard.tsx
"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import UserLayout from "../UserLayout"
import styles from './Dashboard.module.css';

const GET_VEHICLES = gql`
  query GetVehicles {
    vehicles {
      id
      name
      image
      price
      quantity
    }
  }
`;

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicles.</p>;

  return (
    <UserLayout>
        <div className={styles.bannerContainer}>
        <img src="/Main image.png" alt="Car Rental Banner" className={styles.bannerImage} />
      </div>
      <h1>Available Vehicles</h1>
      <div className={styles.cardContainer}>
        {data.vehicles.map((vehicle: any) => (
          <div key={vehicle.id} className={styles.card}>
            <img src={vehicle.image} alt={vehicle.name} className={styles.image}/>
            <h2>{vehicle.name}</h2>
            <p>Price: ${vehicle.price}</p>
            <p>Available: {vehicle.quantity}</p>
            <button>Select</button>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default Dashboard;
