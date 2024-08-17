"use client";
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import styles from '../styles/HomePage.module.css';
import { db } from './firebase'

interface Item {
  id: number;
  name: string;
  quantity: string;
}

let initialItems: Item[] = [
  { id: 1, name: 'Apple', quantity: '10' },
  { id: 2, name: 'Banana', quantity: '5' }
];

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(db, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList:any = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setItems(inventoryList)
  }
  
  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const docRef = doc(collection(db, 'inventory'), name)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: quantity })
    }
    setItems((prevItems):any => [
      ...prevItems,
      { name: name, quantity: quantity }
    ]);
    // await updateInventory()
  };

  const deleteItem = async (name: string) => {
    const docRef = doc(collection(db, 'inventory'), name)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await deleteDoc(docRef)
    }
    // @ts-ignore
    const updatedItems = items.filter(item => item.name !== name);
    setItems(updatedItems);
    // await updateInventory()
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
            onChange={e => setQuantity(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <button type="submit" className={styles.formButton}>Add Item</button>
      </form>
      <ul className={styles.itemList}>
        {items.map(item => (
          <li key={item.name} className={styles.item}>
            {item.name} - {item.quantity}
            <button onClick={() => deleteItem(item.name)} className={styles.itemButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
