import React from 'react';
import styles from '../styles/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

