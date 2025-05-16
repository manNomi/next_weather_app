import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

type ProviderProps = {
  children: React.ReactNode;
};
const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: ProviderProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ApolloClientProvider;
