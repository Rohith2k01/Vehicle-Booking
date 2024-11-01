// src/graphql/typedefs/authTypeDefs.js
import { gql } from 'apollo-server-express';

const LogintypeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = LogintypeDefs;

