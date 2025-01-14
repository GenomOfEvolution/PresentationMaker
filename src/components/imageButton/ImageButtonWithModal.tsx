import { useState } from "react";
import { ImageButton, ImageButtonProps } from "./ImageButton";
import ModalWindow from "../modalWindow/ModalWindow";
import { v4 } from "uuid";
import type { Image } from "../../types/BaseTypes";
import { ObjectType } from "../../types/BaseTypes";
import { useAppActions } from "../../hooks/useAppActions";

type ImageButtonWithModalProps = Omit<ImageButtonProps, "onClick">;

const ImageButtonWithModal = (props: ImageButtonWithModalProps) => {
  const { addSlideElem } = useAppActions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = (imageUrl: string | null, imageFile: File | null) => {
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
        addSlideElem(image);
        setIsModalOpen(false);
      };
      reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
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
      addSlideElem(image);
      setIsModalOpen(false);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ImageButton {...props} onClick={handleClick} />
      {isModalOpen && <ModalWindow onCancel={handleCancel} onConfirm={handleConfirm} />}
    </>
  );
};

export default ImageButtonWithModal;
