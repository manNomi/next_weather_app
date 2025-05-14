import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_FORECAST = gql`
  query GetForecast($city: String!) {
    forecast(city: $city)
  }
`;

const MainPage = () => {
  const { data, loading, error } = useQuery(GET_FORECAST, {
    variables: { city: "Seoul" },
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>메인</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MainPage;
