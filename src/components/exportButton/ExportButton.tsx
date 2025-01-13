import { ImageButton } from "../imageButton/ImageButton";

const ExportImageButton = () => {
  const handleExport = () => {
    const editorData = localStorage.getItem("editorState");
    if (!editorData) {
      alert("Нет данных для экспорта.");
      return;
    }
    const blob = new Blob([editorData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <ImageButton onClick={handleExport} imageName="upload" title="Экспортировать документ" />
    </div>
  );
};

export default ExportImageButton;
