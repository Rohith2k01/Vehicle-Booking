// src/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import { User } from '../models/login-model';

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }

  // Compare password
  const valid = await bcrypt.compare(password, user.password);
  
  if (!valid) {
    throw new Error('Invalid password');
  }

  // Create and return token
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h', // Token expiry time
  });

  return {
    token,
    user,
  };
};

module.exports = { loginUser };
