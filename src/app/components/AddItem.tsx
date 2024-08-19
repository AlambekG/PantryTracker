// app/components/InventoryManager.tsx
"use client";
import React, { useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import styles from '../../styles/HomePage.module.css';
import { db } from '../firebase';

interface Item {
  id: number;
  name: string;
  quantity: string;
}
 // @ts-ignore
export default function AddItem({setInventory}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const docRef = doc(collection(db, 'inventory'), name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data() as Item;
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity });
    }
    setInventory((prevItems:any) => [
      ...prevItems,
      { name: name, quantity: quantity }
    ]);

    setName('');
    setQuantity('');
  };

  return (
    <div>
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
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <button type="submit" className={styles.formButton}>Add Item</button>
      </form>
    </div>
  );
}