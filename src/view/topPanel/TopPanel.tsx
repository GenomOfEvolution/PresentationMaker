import styles from "./TopPanel.module.css";
import { ImageButton } from "../../components/imageButton/ImageButton";
import { Separator } from "../../components/separator/separator";
import { DropDownButton } from "../../components/dropDownButton/DropDownButton";
import { EditColorButton } from "../../components/editColorButton/EditColorButton";
import { GradientType, LinearGradient } from "../../types/BaseTypes";
import { ScaleInputBox } from "../../components/scaleInputBox/ScaleInputBox";
// import { dispatch } from "../../store/editor.ts";
// import { removeSlide } from "../../store/removeSlide.ts";
// import { renamePresentationTitle } from "../../store/renamePresentationTitle.ts";
// import * as React from "react";

type TopPanelProps = {
  title: string;
};

const TextEditPanel = () => {
  const testGradient: LinearGradient = {
    colors: ["#ff0000", "#0000ff"],
    gradientType: GradientType.linear,
    linearDegrees: 23,
  };
  return (
    <>
      <Separator />
      <EditColorButton
        elemColor={"#ff0000"}
        iconName="colors"
        onClick={() => {
          console.log("Меняем задний фон блока");
        }}
      />
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

const TopPanel = ({ title }: TopPanelProps) => {
  /*function onAddSlide() {}
  function onRemoveSlide() {
    dispatch(removeSlide);
  }
  const onTitleChange: React.ChangeEventHandler = (event) => {
    dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value);
  };*/
  return (
    <div className={styles.topPanel}>
      <input className={styles.title} type="text" defaultValue={title} />

      <div className={styles.toolbar}>
        <div className={styles.toolbar__main}>
          <ImageButton onClick={() => console.log("adding slide")} imageName="add" />
          <Separator />
          <ImageButton onClick={() => console.log("undo")} imageName="undo" />
          <ImageButton onClick={() => console.log("redo")} imageName="redo" />
          <Separator />
          <ImageButton onClick={() => console.log("adding text")} imageName="text_fields" />
          <ImageButton onClick={() => console.log("adding image")} imageName="image" />
          <TextEditPanel />
        </div>
        <ImageButton onClick={() => console.log("folding top panel")} imageName="keyboard_arrow_up" />
      </div>
    </div>
  );
};

export { TopPanel, TextEditPanel };
