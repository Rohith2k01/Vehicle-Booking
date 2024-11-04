"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { REGISTER_USER, SEND_OTP, VERIFY_OTP } from '../../../graphql/user-mutations/registration';
import styles from "@/modules/user/RegistrationForm/RegistrationForm.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

const RegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const [sendOtp] = useMutation(SEND_OTP);
  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [registerUser] = useMutation(REGISTER_USER);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSendOtp = async () => {
    try {
      const { data } = await sendOtp({ variables: { phoneNumber: formData.phoneNumber } });
      if (data?.sendOTP?.status === 'success') {
        setOtpSent(true);
        alert('OTP sent successfully!');
      } else {
        alert(data?.sendOTP?.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const { data } = await verifyOtp({
        variables: { phoneNumber: formData.phoneNumber, otp },
      });
      if (data?.verifyOTP?.status === 'success') {
        setIsVerified(true);
        alert('Phone number verified successfully!');
      } else {
        alert(data?.verifyOTP?.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleRegister = async () => {
    if (!isVerified) {
      alert('Please verify your phone number first');
      return;
    }

    try {
      const { data } = await registerUser({ variables: { input: formData } });
      if (data?.registerUser?.status === 'success') {
        alert('Registration successful!');
        router.push('/user/Login'); // Navigate to the target page, e.g., "/dashboard"
      } else {
        alert(data?.registerUser?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form className={styles.form}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required className={styles.input} />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required className={styles.input} />
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" required className={styles.input} />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className={styles.input} />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required className={styles.input} />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" required className={styles.input} />
        <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className={styles.input} />
        <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className={styles.input} />
        <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" className={styles.input} />
        <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className={styles.input} />

        {otpSent && (
          <>
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required className={styles.input} />
            <button type="button" onClick={handleVerifyOtp} className={styles.button}>Verify OTP</button>
          </>
        )}
        {!otpSent && <button type="button" onClick={handleSendOtp} className={styles.button}>Send OTP</button>}
        <button type="button" onClick={handleRegister} className={styles.registerButton}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
