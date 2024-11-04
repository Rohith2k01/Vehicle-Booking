"use client";
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation'; // Updated import for use with App Router
import { LOGIN_USER } from '../../../graphql/admin-mutations/login';
import client from '../../../lib/apollo-client'; // Your Apollo Client instance
import styles from './LoginForm.module.css'; // Optional: Create styles for this component

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Mutation hook for login
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    client,
    onCompleted: (data) => {
      if (data.loginUser.status === 'success') {
        const { token, data: userData } = data.loginUser;
        // Store token in localStorage or cookies as needed
        localStorage.setItem('token', token);
        // Navigate to the dashboard or home page
        router.push('/');
      } else {
        setError(data.loginUser.message);
      }
    },
    onError: (error) => {
      setError('An error occurred during login. Please try again.');
      console.error(error);
    },
  });

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any existing errors

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    await loginUser({ variables: { email, password } });
  };

  return (
    <div className={styles.loginContainer}>
    <h2 className={styles.title}>Login</h2>
    <form onSubmit={handleSubmit} className={styles.loginForm}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
            />
        </div>
        <div className={styles.inputGroup}>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
            />
        </div>
        <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </button>
    </form>
</div>

  );
};

export default LoginPage;




