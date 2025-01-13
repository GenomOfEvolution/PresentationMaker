import { useState } from "react";
import AJV from "ajv";
import { ImageButton } from "../imageButton/ImageButton";

const schema = {};

const ajv = new AJV();
const validate = ajv.compile(schema);

export type ImportImageButtonProps = {
  onImport: (data: any) => void;
};

const ImportImageButton = ({ onImport }: ImportImageButtonProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      handleImport(selectedFile);
    }
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        const valid = validate(data);
        if (!valid) {
          alert("Неверный формат документа. Ошибки валидации:");
          console.log(validate.errors);
          return;
        }
        onImport(data);
      } catch (error) {
        alert("Ошибка импорта: " + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    document.getElementById("file-input")?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <ImageButton onClick={handleButtonClick} imageName="download" title="Импортировать документ" />
    </div>
  );
};

export default ImportImageButton;
