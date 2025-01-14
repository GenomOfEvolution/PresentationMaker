import { useState } from "react";
import AJV from "ajv";
import { ImageButton } from "../imageButton/ImageButton";
import schema from "../../schemasAJV/schema.json";

const ajv = new AJV();
const validate = ajv.compile(schema);

const ImportImageButton = () => {
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

        localStorage.setItem("editorState", JSON.stringify(data));

        // Поставил пока рефреш страницы, чтобы обновить все что есть
        window.location.reload();
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
