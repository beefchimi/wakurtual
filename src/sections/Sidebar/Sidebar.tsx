// @ts-expect-error no types
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.Sidebar}>
      <p>Sidebar</p>
    </aside>
  );
}
