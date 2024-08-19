// app/page.tsx
import styles from '../styles/HomePage.module.css';
import InventoryManager from './components/InventoryManager';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pantry Tracker</h1>
      <InventoryManager />
    </div>
  );
}