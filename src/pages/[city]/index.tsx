import { useRouter } from "next/router";
import styles from "./style.module.css";

const CityPage = () => {
  const { query } = useRouter();
  const { city } = query;

  return (
    <main className={styles.wrapper}>
      <section className={styles.panel}>
        <h1 className={styles.title}>Weather Information for {city}</h1>
        <div className={styles.placeholderCard} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
      </section>

      <section className={styles.panel}>
        <h1 className={styles.title}>Weather Information for {city}</h1>
        <div className={styles.placeholderCard} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
        <div className={styles.placeholderRow} />
      </section>
    </main>
  );
};

export default CityPage;
