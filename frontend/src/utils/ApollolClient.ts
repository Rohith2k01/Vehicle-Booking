import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({

    uri: 'http://localhost:8080/graphql', // Adjust this to match your GraphQL endpoint

  cache: new InMemoryCache(),
});

export default client;
