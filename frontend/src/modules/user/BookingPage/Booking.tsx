"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for use with App Router
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Razorpay from 'razorpay';

// GraphQL Queries and Mutations
const GET_AVAILABLE_VEHICLES = gql`
  query GetAvailableVehicles($pickupDate: String!, $dropoffDate: String!) {
    getAvailableVehicles(pickupDate: $pickupDate, dropoffDate: $dropoffDate) {
      id
      vehicleId
      pricePerDay
      availableQuantity
      vehicle {
        id
        name
        description
        primaryImageUrl
      }
    }
  }
`;

const CREATE_PAYMENT_ORDER = gql`
  mutation CreatePaymentOrder($totalPrice: Float!, $bookingInput: CreateBookingInput!) {
    createPaymentOrder(totalPrice: $totalPrice, bookingInput: $bookingInput) {
      status
      message
      razorpayOrderId
      amount
      currency
    }
  }
`;

const VERIFY_PAYMENT_AND_CREATE_BOOKING = gql`
  mutation VerifyPaymentAndCreateBooking($paymentDetails: PaymentInput!, $bookingInput: CreateBookingInput!) {
    verifyPaymentAndCreateBooking(paymentDetails: $paymentDetails, bookingInput: $bookingInput) {
      status
      message
      data {
        id
        vehicleId
        userId
        pickupDate
        dropoffDate
        totalPrice
        status
      }
    }
  }
`;

const BookingPage = () => {
  const router = useRouter();
  const { pickupDate, dropoffDate } = router.query;

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [razorpayOrderId, setRazorpayOrderId] = useState('');
  
  const [createPaymentOrder] = useMutation(CREATE_PAYMENT_ORDER);
  const [verifyPaymentAndCreateBooking] = useMutation(VERIFY_PAYMENT_AND_CREATE_BOOKING);
  
  const { loading, error, data } = useQuery(GET_AVAILABLE_VEHICLES, {
    variables: { pickupDate, dropoffDate },
  });

  useEffect(() => {
    if (data && data.getAvailableVehicles) {
      setVehicles(data.getAvailableVehicles);
    }
  }, [data]);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setTotalPrice(vehicle.pricePerDay); // You might want to calculate based on the days
  };

  const handlePayment = async () => {
    if (!selectedVehicle) {
      alert('Please select a vehicle');
      return;
    }

    const bookingInput = {
      vehicleId: selectedVehicle.vehicleId,
      pickupDate: pickupDate,
      dropoffDate: dropoffDate,
      totalPrice: totalPrice,
      userContact: '', // Include user contact if needed
    };

    const paymentResponse = await createPaymentOrder({
      variables: {
        totalPrice: totalPrice,
        bookingInput,
      },
    });

    if (paymentResponse.data.createPaymentOrder.status === 'success') {
      const { razorpayOrderId, amount, currency } = paymentResponse.data.createPaymentOrder;
      setRazorpayOrderId(razorpayOrderId);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Car Rental Service',
        description: 'Booking Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          const paymentDetails = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Verify payment and create booking
          const bookingResponse = await verifyPaymentAndCreateBooking({
            variables: {
              paymentDetails,
              bookingInput,
            },
          });

          if (bookingResponse.data.verifyPaymentAndCreateBooking.status === 'success') {
            alert('Booking confirmed! Details: ' + JSON.stringify(bookingResponse.data.verifyPaymentAndCreateBooking.data));
            // Redirect or update UI
          } else {
            alert('Payment verification failed: ' + bookingResponse.data.verifyPaymentAndCreateBooking.message);
          }
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } else {
      alert('Failed to create payment order: ' + paymentResponse.data.createPaymentOrder.message);
    }
  };

  return (
    <div>
      <h1>Book a Vehicle</h1>
      {loading && <p>Loading available vehicles...</p>}
      {error && <p>Error loading vehicles: {error.message}</p>}
      <div>
        <h2>Available Vehicles</h2>
        {vehicles.length > 0 ? (
          vehicles.map(vehicle => (
            <div key={vehicle.id} onClick={() => handleVehicleSelect(vehicle)}>
              <img src={vehicle.vehicle.primaryImageUrl} alt={vehicle.vehicle.name} width="100" />
              <h3>{vehicle.vehicle.name}</h3>
              <p>{vehicle.vehicle.description}</p>
              <p>Price Per Day: ₹{vehicle.pricePerDay}</p>
              <p>Available: {vehicle.availableQuantity}</p>
              <button>Select</button>
            </div>
          ))
        ) : (
          <p>No vehicles available for the selected dates.</p>
        )}
      </div>

      {selectedVehicle && (
        <div>
          <h3>Selected Vehicle: {selectedVehicle.vehicle.name}</h3>
          <p>Total Price: ₹{totalPrice}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
