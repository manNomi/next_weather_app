import { ApolloProvider } from "@apollo/client";
import { client } from "../app/Apollo";
import "../app/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
