import bcrypt from 'bcrypt';
import Customer from'../../models/registration-model.js';
import { sendOTP, verifyOTP } from '../../../../config/twofactor.js';

const RegistrationResolvers = {
  Query: {
    customers: () => Customer.findAll(),
  },
  Mutation: {
    Customer: async (_, args) => {
      const { name, email, phone, password } = args;

      // Validate unique phone
      const existingCustomer = await Customer.findOne({ where: { phone } });
      if (existingCustomer) {
        throw new Error('Phone number already in use');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Temporarily save the user without activation
      const newCustomer = await Customer.create({
        ...args,
        password: hashedPassword,
        isVerified: false,
      });

      // Send OTP to user phone
      const otpResponse = await sendOTP(phone);
      newCustomer.sessionId = otpResponse.Details; // Store sessionId from TwoFactor for OTP verification
      await newCustomer.save();

      console.log(`OTP sent to phone ${phone}`);
      return newCustomer;
    },

    verifyPhone: async (_, { phone, otp }) => {
      const customer = await Customer.findOne({ where: { phone } });
      if (!customer) {
        throw new Error('Customer not found');
      }

      // Verify OTP using TwoFactor API
      const verificationResponse = await verifyOTP(customer.sessionId, otp);

      if (verificationResponse.Status === 'Success') {
        customer.isVerified = true;
        await customer.save();
        return true;
      } else {
        throw new Error('OTP verification failed');
      }
    },
  },
};

module.exports = RegistrationResolvers;
