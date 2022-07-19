import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "../config";
const { ApiContentUrl } = config;

// Notion
// Env --> Done
// Github --> Done

export const apolloClient = new ApolloClient({
  uri: ApiContentUrl,
  cache: new InMemoryCache(),
});
