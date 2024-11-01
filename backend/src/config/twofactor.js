import axios from 'axios';

const TWO_FACTOR_API_KEY = '2908a864-91e7-11ef-8b17-0200cd936042';

// Function to send OTP
const sendOTP = async (phone) => {
  const url = `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

// Function to verify OTP
const verifyOTP = async (session_id, otp) => {
  const url = `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${session_id}/${otp}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to verify OTP');
  }
};

module.exports = { sendOTP, verifyOTP };
