import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const MainPage = () => {
  React.useEffect(() => {
    client
      .query({
        query: gql`
          query {
            forecast(city: "Seoul")
          }
        `,
      })
      .then((result) => console.log(result.data))
      .catch((error) => console.error("Error fetching weather data:", error));

    console.log("MainPage component mounted");
  }, []);

  return (
    <div>
      <div>메인</div>
    </div>
  );
};
export default MainPage;
