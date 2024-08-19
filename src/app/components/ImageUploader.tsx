// app/components/ImageUploader.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/HomePage.module.css';
import { Camera } from 'react-camera-pro';

//@ts-ignore
export default function ImageUploader({onUpload}) {
  const camera = useRef(null);
  const [image, setImage] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("here");
      setImage(e.target.files[0]);
    }
  };

  const photoShoot = () => {
    const photo = camera.current?.takePhoto();
    setImage(photo);
  }

  useEffect(() => {
    onUpload(image);
  }, [image])
  return (
    <div className={styles.foodRecognition}>
      <label>
        Food Recognition:
        <input
          type="file"
          onChange={handleImageChange}
          className={styles.formInput}
        />
      </label>
      <label className={styles.photoShoot}>
        <button onClick={()=> setShowCamera(true)}> Take a photo </button>
        {image && <img src={image} alt="Captured" className={styles.capturedImage} />}
        {showCamera && <>
          <Camera
            ref={camera}
            aspectRatio={16 / 9}
            className={styles.camera}
          />
          <button onClick={photoShoot}> <span>&#128247;</span> </button>
        </> 
        }
      </label>
    </div>
  );
}
