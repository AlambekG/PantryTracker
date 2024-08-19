// app/page.tsx
import styles from '../styles/HomePage.module.css';
import AddItem from './components/AddItem';
import ImageUploader from './components/ImageUploader';
import Inventory from './components/Inventory';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pantry Tracker</h1>
      <Inventory />
    </div>
  );
}