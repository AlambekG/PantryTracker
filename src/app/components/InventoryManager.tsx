// app/components/InventoryManager.tsx
"use client";

import React, { useState, useEffect } from 'react';
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
import { AddItem, addTolist } from './AddItem';
import ImageUploader from './ImageUploader';
import { openaiRes } from '../imageDetection/openaiService';

interface Item {
  id: number;
  name: string;
  quantity: string;
}

export default function InventoryManager() {
  const [items, setItems] = useState<Item[]>([]);

  const updateInventory = async () => {
    const snapshot = query(collection(db, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList: Item[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() } as Item);
    });
    setItems(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const deleteItem = async (name: string) => {
    const docRef = doc(collection(db, 'inventory'), name);
    await deleteDoc(docRef);
    setItems((prevItems) => prevItems.filter((item) => item.name !== name));
  };

  const onImageUpload = async (imageFile: any) => {
    const response = await openaiRes(imageFile);
    if(response){
      addTolist(response, 1, setItems);
    } else {
      console.error("error recognizing image")
    }
  }

  return (
    <div>
      <AddItem setInventory={setItems}/>
      <ImageUploader onUpload={onImageUpload} />
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item.name} className={styles.item}>
            {item.name} - {item.quantity}
            <button onClick={() => deleteItem(item.name)} className={styles.itemButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}