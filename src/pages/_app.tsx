import ApolloClientProvider from "../app/apollo";
import "../app/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ApolloClientProvider>
      <Component {...pageProps} />
    </ApolloClientProvider>
  );
};

export default App;
