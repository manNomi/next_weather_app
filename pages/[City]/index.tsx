import { useRouter } from "next/router";

const CityPage = () => {
  const router = useRouter();
  const { City } = router.query;

  return (
    <div>
      <h1>도시 이름: {City}</h1>
      <p>여기는 {City}의 날씨 정보 페이지입니다.</p>
    </div>
  );
};

export default CityPage;
