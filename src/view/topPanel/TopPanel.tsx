import styles from "./TopPanel.module.css";
import { ImageButton } from "../../components/imageButton/ImageButton";
import { Separator } from "../../components/separator/separator";
import { DropDownButton } from "../../components/dropDownButton/DropDownButton";
import { EditColorButton } from "../../components/editColorButton/EditColorButton";
import { Color, createImageObject, createTextObject, Gradient, Image, Text } from "../../types/BaseTypes";
import { ScaleInputBox } from "../../components/scaleInputBox/ScaleInputBox";
import { dispatch } from "../../store/editor";
import { addNewSlide } from "../../store/functions/addSlide";
import { removeSlide } from "../../store/functions/removeSlide";
import { SelectionType } from "../../types/Selection";
import { addSlideElem } from "../../store/functions/addSlideElement";
import { TextButton } from "../../components/textButton/TextButton";
import { editBackground } from "../../store/functions/editBackground";
import { renamePresentation } from "../../store/functions/renamePresentation";
import { useAppContext } from "../../contexts/appContext/AppContextProvider";
import { updateBlockBgColor } from "../../store/functions/updateBlockBgColor";
import { updateBlockBorderColor } from "../../store/functions/updateBlockBorderColor";
import { updateFontColor } from "../../store/functions/updateFontColor";
import { updateFontBgColor } from "../../store/functions/updateFontBgColor";
import { updateFontName } from "../../store/functions/updateFontName";
import { updateFontSize } from "../../store/functions/updateFontSize";

type TopPanelProps = {
  title: string;
  selection: SelectionType;
};

type BasePanelProps = {
  selection: SelectionType;
};

const BasePanel = ({ selection }: BasePanelProps) => {
  return (
    <>
      <ImageButton
        title="Удалить слайд"
        onClick={() => dispatch(removeSlide, selection.selectedSlidesId as string[])}
        imageName="delete"
      />
      <ImageButton title="Новый слайд" onClick={() => dispatch(addNewSlide)} imageName="add" />
      <Separator />
      <ImageButton title="Отменить" onClick={() => console.log("undo")} imageName="undo" />
      <ImageButton title="Повторить" onClick={() => console.log("redo")} imageName="redo" />
      <Separator />
      <ImageButton
        title="Текстовое поле"
        onClick={() =>
          dispatch(addSlideElem, createTextObject({ x: 50, y: 50 }, { width: 100, height: 50 }, "New text"))
        }
        imageName="text_fields"
      />
      <ImageButton
        title="Вставить изображение"
        onClick={() =>
          dispatch(
            addSlideElem,
            createImageObject(
              { x: 50, y: 50 },
              { width: 100, height: 50 },
              "https://dota2.ru/img/heroes/pudge/portrait.jpg",
              "URL",
            ),
          )
        }
        imageName="image"
      />
      <Separator />
    </>
  );
};

export type ImageEditPanelProps = {
  image: Image;
  selection: SelectionType;
};

const ImageEditPanel = ({ image, selection }: ImageEditPanelProps) => {
  return (
    <>
      <EditColorButton
        needGradient={false}
        needTransparent={true}
        title="Цвет границ"
        elemColor={image.blockBorderColor}
        iconName="ink_marker"
        onColorChange={(color: Color | Gradient) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            const newColor = color;
            dispatch(updateBlockBorderColor, { id, newColor });
          });
        }}
        onClick={() => {}}
      />
    </>
  );
};

export type TextEditPanelProps = {
  text: Text;
  selection: SelectionType;
};

const TextEditPanel = ({ text, selection }: TextEditPanelProps) => {
  return (
    <>
      <EditColorButton
        needGradient={true}
        needTransparent={true}
        title="Цвет заливки"
        elemColor={text.blockBgColor}
        iconName="colors"
        onColorChange={(color: Color | Gradient) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            const newColor = color;
            dispatch(updateBlockBgColor, { id, newColor });
          });
        }}
        onClick={() => {}}
      />
      <EditColorButton
        needGradient={false}
        needTransparent={true}
        title="Цвет границ"
        elemColor={text.blockBorderColor}
        iconName="ink_marker"
        onColorChange={(color: Color | Gradient) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            const newColor = color;
            dispatch(updateBlockBorderColor, { id, newColor });
          });
        }}
        onClick={() => {}}
      />
      <Separator />
      <DropDownButton
        onSelect={(value: string) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            dispatch(updateFontName, { id: id, newFontName: value });
          });
        }}
        currentValue={text.fontName}
        elements={[
          {
            value: "Arial",
            onClick: () => {},
          },
          {
            value: "Lobster",
            onClick: () => {},
          },
          {
            value: "Oswald",
            onClick: () => {},
          },
          {
            value: "Nunito",
            onClick: () => {},
          },
        ]}
      />
      <Separator />

      <ScaleInputBox
        initialValue={text.fontSize}
        onChange={(newValue) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            dispatch(updateFontSize, { id: id, newFontSize: newValue });
          });
        }}
      />

      <Separator />
      <ImageButton
        title="Полужирный"
        imageName="format_bold"
        onClick={() => {
          console.log("Делаем полужирный текст");
        }}
      />
      <ImageButton
        title="Курсив"
        imageName="format_italic"
        onClick={() => {
          console.log("Делаем курсивный текст");
        }}
      />
      <ImageButton
        title="Подчеркнутый"
        imageName="format_underlined"
        onClick={() => {
          console.log("Делаем подчеркнутый текст");
        }}
      />
      <EditColorButton
        needGradient={false}
        needTransparent={false}
        title="Цвет текста"
        elemColor={text.fontColor}
        iconName="palette"
        onColorChange={(color: Color | Gradient) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            const newColor = color;
            dispatch(updateFontColor, { id, newColor });
          });
        }}
        onClick={() => {}}
      />
      <EditColorButton
        needGradient={false}
        needTransparent={true}
        title="Цвет фона текста"
        elemColor={text.fontBgColor}
        iconName="ink_highlighter"
        onColorChange={(color: Color | Gradient) => {
          selection.selectedSlideObjectsId?.forEach((elem) => {
            const id = elem;
            const newColor = color;
            dispatch(updateFontBgColor, { id, newColor });
          });
        }}
        onClick={() => {}}
      />
    </>
  );
};

export type SlidePanelProps = {
  selection: SelectionType;
};

const SlidePanel = ({ selection }: SlidePanelProps) => {
  return (
    <>
      <TextButton selection={selection} onClick={() => {}} text="Фон" />
    </>
  );
};

export type ChoosePanelProps = {
  currentElement: Text | Image | null;
  selection: SelectionType;
};

const ChoosePanel = ({ currentElement, selection }: ChoosePanelProps) => {
  if (currentElement === null) {
    return (
      <>
        <SlidePanel selection={selection} />
      </>
    );
  } else if ("fontFormatting" in currentElement) {
    return (
      <>
        <TextEditPanel text={currentElement} selection={selection} />
      </>
    );
  } else if ("source" in currentElement) {
    return (
      <>
        <ImageEditPanel image={currentElement} selection={selection} />
      </>
    );
  }
};

const TopPanel = ({ title, selection }: TopPanelProps) => {
  const onTitleChange: React.ChangeEventHandler = (event) => {
    dispatch(renamePresentation, (event.target as HTMLInputElement).value);
  };

  const { currentElement } = useAppContext();

  return (
    <div className={styles.topPanel}>
      <input className={styles.title} type="text" defaultValue={title} onChange={onTitleChange} />
      <div className={styles.toolbar}>
        <div className={styles.toolbar__main}>
          <BasePanel selection={selection} />
          {ChoosePanel({ currentElement, selection })}
        </div>
        <ImageButton
          title="Скрыть меню"
          onClick={() => console.log("folding top panel")}
          imageName="keyboard_arrow_up"
        />
      </div>
    </div>
  );
};

export { TopPanel, TextEditPanel };
