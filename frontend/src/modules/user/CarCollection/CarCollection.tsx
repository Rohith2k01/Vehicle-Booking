// "use client";

// import React, { useState, useEffect } from 'react';
// import { useQuery, gql } from '@apollo/client';
// import CarCard from '../CarCardsSection/CarCards';
// import styles from './CarCollection.module.css';
// import { useRouter } from 'next/navigation'; 
// import { Tooltip, Rate, Input, message } from "antd";
// import Button from "@/themes/button";
// import { SearchOutlined } from '@ant-design/icons';
// import { searchVehicles } from "../../../lib/typesense-client";





// // GraphQL Query to get rentable vehicles
// const GET_RENTABLE_VEHICLES = gql`
//   query GetRentableVehicles {
//     getRentableVehicles {
//       id
//       vehicleId
//       pricePerDay
//       availableQuantity
//       vehicle {
//         id
//         name
//         description
//         transmission
//         fuelType
//         numberOfSeats
//         year
//         primaryImageUrl
//         manufacturer {
//           id
//           name
//           country
//           imageUrl
//         }
//       }
//     }
//   }
// `;

// const CarCollection: React.FC = () => {
//   const router = useRouter();
//   const { loading, error, data } = useQuery(GET_RENTABLE_VEHICLES); // Use Apollo Client to fetch data
//   const [searchResults, setIsSearchResults] = useState<any[]>([]);
//   const [query, setQuery] = useState(''); // For the search query
//   const [isSearching, setIsSearching] = useState(false);

  
//   useEffect(() => {
//     // Only proceed if there is a query string and it's not just spaces
//     if (query.trim()) {
//       const delayDebounceFn = setTimeout(async () => {
//         setIsSearching(true);
//         try {
//           const results = await searchVehicles(query);
//           setIsSearchResults(results);
//         } catch (error) {
//           message.error("Search failed. Please try again.");
//         } finally {
//           setIsSearching(false);
//         }
//       }, 300); // Wait 300ms after the user stops typing
  
//       return () => clearTimeout(delayDebounceFn); // Cleanup function to clear the timeout
//     } else {
//       setIsSearchResults([]); // Clear results if query is empty
//     }
//   }, [query]); // Dependency on the 'query' variable
  

//   const handleRentNow = (carId: string) => {
//     router.push(`/user/CarBooking?carId=${carId}`); // Navigates to dynamic car booking page
//   };


//   if (loading) return <p>Loading...</p>; // Loading state
//   if (error) return <p>Error: {error.message}</p>; // Error handling

//   // Cars to display, either search results or all data if no search performed
//   const carsToDisplay = searchResults.length > 0 ? searchResults : data.getRentableVehicles;
//   console.log("search result", searchResults)


//   return (
//     <div className={styles.carCollection}>
//       <div className={styles.carCollectionSecondDiv}>
//         <h2>Collection of Cars</h2>

//         {/* Search Section */}
//         <div className={styles.searchSection}>
//           <Input
//             className={styles.inputField}
//             placeholder="Search by car model, manufacturer, or features..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             prefix={<SearchOutlined />}
//             style={{ width: '300px', marginRight: '10px' }}
//           />
//           <Button type="submit" loading={isSearching}>
//             Search
//           </Button>
//         </div>


//         <div className={styles.carsGrid}>
//           {carsToDisplay.map((car: any) => (
//             <CarCard
//               key={car.id}
//               image={car.vehicle.primaryImageUrl}
//               model={car.vehicle.name}
//               price={car.pricePerDay}
//               features={{
//                 passengers: car.vehicle.numberOfSeats || '',
//                 transmission: car.vehicle.transmission,
//                 fuelType: car.vehicle.fuelType,
//               }}
//               onRentNow={() => handleRentNow(car.id)}
//             />
//           ))}
//         </div>

//         <div className={styles.viewMore}>
//           <button className={styles.viewMoreButton}>See all Cars &rarr;</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarCollection;





"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CarCard from '../CarCardsSection/CarCards';
import styles from './CarCollection.module.css';
import { useRouter } from 'next/navigation'; 
import { Tooltip, Rate, Input, message } from "antd";
import Button from "@/themes/button";
import { SearchOutlined } from '@ant-design/icons';
import { searchVehicles } from "../../../lib/typesense-client";

// GraphQL Query to get rentable vehicles
const GET_RENTABLE_VEHICLES = gql`
  query GetRentableVehicles {
    getRentableVehicles {
      id
      vehicleId
      pricePerDay
      availableQuantity
      vehicle {
        id
        name
        description
        transmission
        fuelType
        numberOfSeats
        year
        primaryImageUrl
        manufacturer {
          id
          name
          country
          imageUrl
        }
      }
    }
  }
`;

const CarCollection: React.FC = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RENTABLE_VEHICLES); // Use Apollo Client to fetch data
  const [searchResults, setIsSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState(''); // For the search query
  const [isSearching, setIsSearching] = useState(false);

  // Search functionality
  useEffect(() => {
    if (query.trim()) {
      const delayDebounceFn = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await searchVehicles(query);
          setIsSearchResults(results);
        } catch (error) {
          message.error("Search failed. Please try again.");
        } finally {
          setIsSearching(false);
        }
      }, 300); // Wait 300ms after the user stops typing
  
      return () => clearTimeout(delayDebounceFn); // Cleanup function to clear the timeout
    } else {
      setIsSearchResults([]); // Clear results if query is empty
    }
  }, [query]);

  const handleRentNow = (carId: string) => {
    router.push(`/user/CarBooking?carId=${carId}`); // Navigates to dynamic car booking page
  };

  if (loading) return <p>Loading cars, please wait...</p>; // Improved loading message
  if (error) return <p>Failed to load cars. Please try again later.</p>; // Improved error message

  // Cars to display, either search results or all data if no search performed
  const carsToDisplay = searchResults.length > 0 ? searchResults : data?.getRentableVehicles || [];

  return (
    <div className={styles.carCollection}>
      <div className={styles.carCollectionSecondDiv}>
        <h2>Collection of Cars</h2>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <Input
            className={styles.inputField}
            placeholder="Search by car model, manufacturer, or features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <Button type="submit" loading={isSearching}>
            Search
          </Button>
        </div>

        <div className={styles.carsGrid}>
          {carsToDisplay.map((car: any) => (
            <CarCard
              key={car.id}
              image={car.vehicle?.primaryImageUrl || 'default-image-url.jpg'}  // Optional chaining and default image
              model={car.vehicle?.name || 'Unknown Model' }  // Default model name
              price={car.pricePerDay}
              features={{
                passengers: car.vehicle?.numberOfSeats || 'N/A',
                transmission: car.vehicle?.transmission || 'Unknown',
                fuelType: car.vehicle?.fuelType || 'Unknown',
              }}
              onRentNow={() => handleRentNow(car.id)}
            />
          ))}
        </div>

        <div className={styles.viewMore}>
          <button className={styles.viewMoreButton}>See all Cars &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default CarCollection;


