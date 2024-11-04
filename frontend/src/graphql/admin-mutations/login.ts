import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      status
      message
      token
      data {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;
