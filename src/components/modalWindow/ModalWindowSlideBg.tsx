import React, { useState } from "react";
import { Color, Gradient, ObjectType } from "../../types/BaseTypes";
import { SelectionType } from "../../types/Selection";
import { EditColorButton } from "../editColorButton/EditColorButton";
import styles from "./ModalWindow.module.css";
import { v4 } from "uuid";
import type { Image } from "../../types/BaseTypes";
import { useAppActions } from "../../hooks/useAppActions";

type ModalWindowSlideBgProps = {
  selection: SelectionType;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalWindowSlideBg = ({ selection, onClose, onConfirm }: ModalWindowSlideBgProps) => {
  const { editBackground } = useAppActions();
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
      const reader = new FileReader();
      reader.onload = (e) => {
        const image: Image = {
          objectType: ObjectType.Image,
          url: e.target?.result as string,
          id: v4(),
          pos: { x: 0, y: 0 },
          size: { width: 100, height: 100 },
          blockBgColor: "transparent",
          blockBorderColor: "transparent",
          source: "Base64",
        };
        editBackground(image);
        onConfirm();
      };
      reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
      validateImageUrl(imageUrl, (isValid) => {
        if (isValid) {
          const image: Image = {
            objectType: ObjectType.Image,
            url: imageUrl,
            source: "URL",
            id: v4(),
            pos: { x: 0, y: 0 },
            size: { width: 100, height: 100 },
            blockBgColor: "transparent",
            blockBorderColor: "transparent",
          };
          editBackground(image);
          onConfirm();
        } else {
          setError("Неверная ссылка на изображение.");
        }
      });
    } else {
      onConfirm();
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.content__row}>
            <span className={styles.headingText}>Фон</span>
            <button className={styles.closeButton} onClick={onClose}>
              <i className="material-icons close">close</i>
            </button>
          </div>

          <div className={styles.content__row}>
            <span className={styles.rowText}>Цвет</span>
            <EditColorButton
              needGradient={true}
              needTransparent={false}
              title="Цвет фона слайда"
              elemColor={"transparent"}
              iconName="colors"
              onColorChange={(color: Color | Gradient) => {
                editBackground(color);
              }}
              onClick={() => {}}
            />
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

export default ModalWindowSlideBg;
