import {Stack} from "expo-router";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import React from "react";

const client = new ApolloClient({
    uri: 'https://yantongshan.stepzen.net/api/newbie-moth/__graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: "apikey yantongshan::stepzen.net+1000::f42e4c46825c9713b5db09a96652bc49c89dcd768faf111218e4130d72e740db"
    }
});

const RootLayout = () => {
    return <ApolloProvider client={client}>
        <Stack />
    </ApolloProvider>
}
export default RootLayout
