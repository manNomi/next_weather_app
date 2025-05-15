import { useRouter } from "next/router";

const City = () => {
  const router = useRouter();
  const { city } = router.query;

  return (
    <div>
      <h1>도시 이름: {city}</h1>
      <p>여기는 {city}의 날씨 정보 페이지입니다.</p>
    </div>
  );
};

export default City;
