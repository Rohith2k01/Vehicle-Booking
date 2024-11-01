'use client';  
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import UserLayout from '@/modules/user/UserLayout'
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <head />
        <body>
        <UserLayout />
          {children}
        </body>
      </html>
    </ApolloProvider>
  );
}


