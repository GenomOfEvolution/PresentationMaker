import React, { useState } from "react";
import styles from "./ModalWindow.module.css";

type ModalWindowProps = {
  onCancel: () => void;
  onConfirm: (imageUrl: string | null, imageFile: File | null) => void;
};

const ModalWindow = ({ onCancel, onConfirm }: ModalWindowProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    setError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
      setError(null);
    }
  };

  const validateImageUrl = (url: string, callback: (isValid: boolean) => void) => {
    const img = new Image();
    img.onload = () => {
      callback(true);
    };
    img.onerror = () => {
      callback(false);
    };
    img.src = url;
  };

  const handleConfirm = () => {
    if (imageFile) {
      onConfirm(null, imageFile);
    } else if (imageUrl) {
      validateImageUrl(imageUrl, (isValid) => {
        if (isValid) {
          onConfirm(imageUrl, null);
        } else {
          setError("Неверная ссылка на изображение.");
        }
      });
    } else {
      onConfirm(null, null);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.content__row}>
            <span className={styles.headingText}>Выберите изображение</span>
            <button className={styles.closeButton} onClick={onCancel}>
              <i className="material-icons close">close</i>
            </button>
          </div>

          <div className={styles.content__row}>
            <span className={styles.rowText}>Изображение</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className={styles.content__row}>
            <span className={styles.rowText}>URL</span>
            <input className={styles.urlInput} type="text" value={imageUrl} onChange={handleUrlChange} />
          </div>

          {error && <div className={styles.error}>{error}</div>}
        </div>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
