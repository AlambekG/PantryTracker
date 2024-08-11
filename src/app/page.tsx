"use client";
import { useState, useEffect } from 'react'
// import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
// import { firestore } from '@/firebase'
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   deleteDoc,
//   getDoc,
// } from 'firebase/firestore'
import styles from '../styles/HomePage.module.css';

interface Item {
  id: number;
  name: string;
  quantity: number;
}

let initialItems: Item[] = [
  { id: 1, name: 'Apple', quantity: 10 },
  { id: 2, name: 'Banana', quantity: 5 }
];

export default function Home() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, quantity };
    setItems([...items, newItem]);
    setName('');
    setQuantity(0);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pantry Tracker</h1>
      <form className={styles.formContainer} onSubmit={addItem}>
        <label className={styles.formLabel}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            required
            className={styles.formInput}
          />
        </label>
        <button type="submit" className={styles.formButton}>Add Item</button>
      </form>
      <ul className={styles.itemList}>
        {items.map(item => (
          <li key={item.id} className={styles.item}>
            {item.name} - {item.quantity}
            <button onClick={() => deleteItem(item.id)} className={styles.itemButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
