// app/components/ImageUploader.tsx
"use client";

import React, { useState } from 'react';
import styles from '../../styles/HomePage.module.css';

export default function ImageUploader({onUpload}) {

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("here")
      onUpload(e.target.files[0])
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
