import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { World } from '../../World';
import styles from './index.module.scss';

type Props = {
  setProgress: Dispatch<SetStateAction<string>>;
}

export const Scene = ({ setProgress }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const refWorld = useRef<World>();
  useEffect(() => {
    const container = ref.current;
    if (!container) { return }
    refWorld.current = new World(container);
    return () => {
      refWorld.current?.dispose();
      for (let i = 0; i < container.children.length; i++) {
        container.removeChild(container.children[i]);
      }
    };
  }, [ref, setProgress])

  useEffect(() => {
    const world = refWorld.current;
    if (!world) { return }
    let timer: ReturnType<typeof requestAnimationFrame>;
    const update = () => {
      setProgress(world.progress);
      timer = requestIdleCallback(update);
    }
    update();
    return () => cancelAnimationFrame(timer);
  }, [setProgress, refWorld])

  return <div
    ref={ref}
    className={styles.scene}
  />
}