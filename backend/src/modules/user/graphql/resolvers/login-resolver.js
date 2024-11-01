// src/graphql/resolvers/authResolver.js
import { loginUser } from '../../controllers/login-controller';

const Loginresolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      return await loginUser(email, password);
    },
  },
};

module.exports = Loginresolvers;

