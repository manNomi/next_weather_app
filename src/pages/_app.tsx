import GlobalLayout from "@/app/GlobalLayout";
import "../app/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
};

export default App;
