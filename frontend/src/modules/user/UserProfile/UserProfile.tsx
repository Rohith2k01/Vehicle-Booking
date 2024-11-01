// src/pages/profile.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, UPDATE_USER, UPLOAD_PROFILE_IMAGE, User } from '../../../graphql/user-queries/userprofile'; // Adjust paths as needed
import styles from './UserProfile.module.css'; // Import CSS module

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<User>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        profileImage: '',
    });

    const { loading, error, data } = useQuery<{ getUser: User }, { id: string }>(GET_USER, {
        variables: { id: 'USER_ID' }, // Replace with actual user ID
        onCompleted: (data) => setUserData(data.getUser),
    });

    const [updateUser] = useMutation(UPDATE_USER);
    const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('profileImage', file);
            uploadProfileImage({ variables: { id: 'USER_ID', profileImage: formData } }); // Replace with actual user ID
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateUser({ variables: { id: 'USER_ID', ...userData } }); // Replace with actual user ID
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.profileContainer}>
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.imageContainer}>
                    <img src={userData.profileImage} alt="Profile" className={styles.profileImage} />
                    <input type="file" onChange={handleFileChange} className={styles.fileInput} />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={styles.input}
                    />
                </div>
                <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={styles.input}
                />
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="country"
                        value={userData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className={styles.input}
                    />
                    <input
                        type="text"
                        name="pincode"
                        value={userData.pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
