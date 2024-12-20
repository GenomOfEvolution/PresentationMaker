import styles from "./TopPanel.module.css";
import { ImageButton } from "../../components/imageButton/ImageButton";
import { Separator } from "../../components/separator/separator";
import { DropDownButton } from "../../components/dropDownButton/DropDownButton";
import { EditColorButton } from "../../components/editColorButton/EditColorButton";
import {
  createImageObject,
  createTextObject,
  GradientType,
  Image,
  LinearGradient,
  ObjectType,
  Text,
} from "../../types/BaseTypes";
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
      <ImageButton onClick={() => dispatch(removeSlide, selection.selectedSlidesId as string[])} imageName="delete" />
      <ImageButton onClick={() => dispatch(addNewSlide)} imageName="add" />
      <Separator />
      <ImageButton onClick={() => console.log("undo")} imageName="undo" />
      <ImageButton onClick={() => console.log("redo")} imageName="redo" />
      <Separator />
      <ImageButton
        onClick={() =>
          dispatch(addSlideElem, createTextObject({ x: 50, y: 50 }, { width: 100, height: 50 }, "New text"))
        }
        imageName="text_fields"
      />
      <ImageButton
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

const ImageEditPanel = () => {
  const testGradient: LinearGradient = {
    colors: ["#ff0000", "#0000ff"],
    gradientType: GradientType.linear,
    linearDegrees: 23,
  };
  return (
    <>
      <EditColorButton elemColor={"#ff0000"} iconName="colors" onClick={() => {}} />
      <EditColorButton
        elemColor={testGradient}
        iconName="ink_marker"
        onClick={() => {
          console.log("Меняем цвет границы блока");
        }}
      />
    </>
  );
};

const TextEditPanel = () => {
  const testGradient: LinearGradient = {
    colors: ["#ff0000", "#0000ff"],
    gradientType: GradientType.linear,
    linearDegrees: 23,
  };
  return (
    <>
      <EditColorButton elemColor={"#ff0000"} iconName="colors" onClick={() => {}} />
      <EditColorButton
        elemColor={testGradient}
        iconName="ink_marker"
        onClick={() => {
          console.log("Меняем цвет границы блока");
        }}
      />
      <Separator />
      <DropDownButton
        currentValue={"Arial"}
        elements={[
          {
            value: "Arial",
            onClick: () => {
              console.log("Устанавливаем шрифт Arial");
            },
          },
          {
            value: "Lobster",
            onClick: () => {
              console.log("Устанавливаем шрифт Lobster");
            },
          },
          {
            value: "Oswald",
            onClick: () => {
              console.log("Устанавливаем шрифт Oswald");
            },
          },
          {
            value: "Nunito",
            onClick: () => {
              console.log("Устанавливаем шрифт Nunito");
            },
          },
        ]}
      />
      <Separator />
      <ImageButton
        imageName="remove"
        onClick={() => {
          console.log("Уменьшаем размер шрифта");
        }}
      />

      <ScaleInputBox
        num="15"
        onChange={() => {
          console.log("меняем размер шрифта");
        }}
      />

      <ImageButton
        imageName="add"
        onClick={() => {
          console.log("Увеличиваем размер шрифта");
        }}
      />
      <Separator />
      <ImageButton
        imageName="format_bold"
        onClick={() => {
          console.log("Делаем полужирный текст");
        }}
      />
      <ImageButton
        imageName="format_italic"
        onClick={() => {
          console.log("Делаем курсивный текст");
        }}
      />
      <ImageButton
        imageName="format_underlined"
        onClick={() => {
          console.log("Делаем подчеркнутый текст");
        }}
      />
      <EditColorButton
        elemColor={"transparent"}
        iconName="palette"
        onClick={() => {
          console.log("Меняем цвет текста");
        }}
      />
      <EditColorButton
        elemColor={"#000000"}
        iconName="ink_highlither"
        onClick={() => {
          console.log("Меняем фона текста");
        }}
      />
    </>
  );
};

const SlidePanel = () => {
  return (
    <>
      <TextButton
        onClick={() =>
          dispatch(
            editBackground,
            createImageObject(
              { x: 50, y: 50 },
              { width: 100, height: 50 },
              "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/66b3ea5489be478613512121_43.png",
              "URL",
            ),
          )
        }
        text="Фон"
      />
    </>
  );
};

const ChoosePanel = (currentElement: Text | Image | null) => {
  if (currentElement === null) {
    return (
      <>
        <SlidePanel />
      </>
    );
  } else if ("fontFormatting" in currentElement) {
    return (
      <>
        <TextEditPanel />
      </>
    );
  } else if ("source" in currentElement) {
    return (
      <>
        <ImageEditPanel />
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
          {ChoosePanel(currentElement)}
        </div>
        <ImageButton onClick={() => console.log("folding top panel")} imageName="keyboard_arrow_up" />
      </div>
    </div>
  );
};

export { TopPanel, TextEditPanel };
