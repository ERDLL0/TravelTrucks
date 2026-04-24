import styles from './Loader.module.css';

export default function Loader({ size = 'md', fullPage = false }) {
  const spinner = (
    <div className={`${styles.spinner} ${styles[size]}`}>
      <div className={styles.ring} />
    </div>
  );

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>;
  }

  return spinner;
}
