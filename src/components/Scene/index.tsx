import { useEffect, useRef } from 'react';
import { World } from '../../World';
import styles from './index.module.scss';

export const Scene = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) { return }
    const world = new World(container);
    return () => {
      world.dispose();
      for (let i = 0; i < container.children.length; i++) {
        container.removeChild(container.children[i]);
      }
    };
  }, [ref])

  return <div
    ref={ref}
    className={styles.scene}
  />
}