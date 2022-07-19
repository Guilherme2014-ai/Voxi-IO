import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "../config";
const { ApiContentUrl } = config;

// notion
// env --> Done
// github

export const apolloClient = new ApolloClient({
  uri: ApiContentUrl,
  cache: new InMemoryCache(),
});
