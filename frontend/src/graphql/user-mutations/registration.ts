import { gql } from '@apollo/client';

export const SEND_OTP = gql`
  mutation sendOTP($phoneNumber: String!) {
    sendOTP(phoneNumber: $phoneNumber) {
      status
      message
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterInput!) {
    registerUser(input: $input) {
      status
      message
      data {
        id
        firstName
        lastName
        phoneNumber
        email
        city
        state
        country
        pincode
      }
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOTP($phoneNumber: String!, $otp: String!) {
    verifyOTP(phoneNumber: $phoneNumber, otp: $otp) {
      status
      message
    }
  }
`;
