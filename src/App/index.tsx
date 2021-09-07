import { useState } from 'react';
import { Scene } from '../components';
import styles from './index.module.scss';

export const App = () => {
  const [progress, setProgress] = useState(`0/0`);
  return <div className={styles.root} >
    <Scene setProgress={setProgress} />
    <div className={styles.progress}>{progress}</div>
  </div>
}