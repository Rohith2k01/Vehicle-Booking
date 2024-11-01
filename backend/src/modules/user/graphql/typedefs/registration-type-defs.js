import { gql } from 'apollo-server-express';

const RegistrationTypeDefs = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
    phone: String!
    city: String
    state: String
    country: String
    pincode: String
  }

  type Query {
    customers: [Customer!]
  }

  type Mutation {
    registerCustomer(
      name: String!
      email: String!
      phone: String!
      city: String
      state: String
      country: String
      pincode: String
      password: String!
    ): Customer

    verifyPhone(phone: String!, otp: String!): Boolean
  }
`;

module.exports = RegistrationTypeDefs;
