import Head from "next/head";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <main>
        <h1>도시를 선택해주세요</h1>
        <ul>
          <li>
            <Link href="/Seoul">서울</Link>
          </li>
          <li>
            <Link href="/Tokyo">도쿄</Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Home;
