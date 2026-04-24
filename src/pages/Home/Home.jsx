import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        style={{ backgroundImage: "url('/home.png')" }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <strong>Campers of your dreams</strong>
          </h1>

          <p className={styles.heroSub}>
            You can find everything you want in our catalog
          </p>

          <button
            className={styles.cta}
            onClick={() => navigate('/catalog')}
          >
            View Now
          </button>
        </div>
      </section>
    </div>
  );
}