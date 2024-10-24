import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getVehicleById(id: Int!): RentableVehicle
  }

  type RentableVehicle {
    id: ID!
    pricePerDay: Float!
    availableQuantity: Int!
    vehicle: Vehicle!
  }

  type Vehicle {
    id: ID!
    name: String!
    description: String
    transmission: String
    fuelType: String
    numberOfSeats: Int
    year: String
    primaryImageUrl: String
    manufacturer: Manufacturer
  }

  type Manufacturer {
    id: ID!
    name: String!
    country: String
    imageUrl: String
  }
`;

export default typeDefs;
