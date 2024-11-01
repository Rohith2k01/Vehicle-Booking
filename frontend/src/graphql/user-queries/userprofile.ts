// src/graphql/queries.js

import { gql } from '@apollo/client';


// Define the User interface
export interface User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    profileImage: string;
}

export const GET_USER = gql`
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            phoneNumber
            email
            city
            state
            country
            pincode
            profileImage
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!,
        $firstName: String,
        $lastName: String,
        $phoneNumber: String,
        $email: String,
        $city: String,
        $state: String,
        $country: String,
        $pincode: String,
        $password: String
    ) {
        updateUser(
            id: $id,
            firstName: $firstName,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            email: $email,
            city: $city,
            state: $state,
            country: $country,
            pincode: $pincode,
            password: $password
        ) {
            id
        }
    }
`;

export const UPLOAD_PROFILE_IMAGE = gql`
    mutation UploadProfileImage($id: ID!, $profileImage: String!) {
        uploadProfileImage(id: $id, profileImage: $profileImage) {
            profileImage
        }
    }
`;
