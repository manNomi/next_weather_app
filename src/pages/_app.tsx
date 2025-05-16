import GlobalLayout from "@/app/GlobalLayout";
import "../app/styles/globals.css";
import CommonMetaTags from "@/shared/lib/meta/meta";

const App = ({ Component, pageProps }) => {
  return (
    <GlobalLayout>
      <CommonMetaTags />
      <Component {...pageProps} />
    </GlobalLayout>
  );
};

export default App;
