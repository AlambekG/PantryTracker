// app/components/ImageUploader.tsx
"use client";

import React, { useState } from 'react';
import styles from '../../styles/HomePage.module.css';

export default function ImageUploader() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className={styles.uploadImage}>
        Upload Image:
        <input
          type="file"
          onChange={handleImageChange}
          className={styles.formInput}
        />
      </label>
    </div>
  );
}
