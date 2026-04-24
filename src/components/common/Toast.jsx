import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.show : styles.hide}`}>
      <span>{message}</span>
      <button className={styles.close} onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>✕</button>
    </div>
  );
}
