import jsPDF from "jspdf";
import { Presentation } from "../../types/Presentation";
import { BackgroundColor, BackgroundImg, BackgroundType } from "../../types/Slide";
import { ObjectType } from "../../types/BaseTypes";

const exportPdf = async (pres: Presentation) => {
  const SLIDE_WIDTH = 1000;
  const SLIDE_HEIGHT = 562;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [SLIDE_WIDTH, SLIDE_HEIGHT],
  });

  pdf.addFont("https://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf", "Lobster", "normal");

  pres.slideCollection.forEach((slide, index) => {
    // Фон
    if (slide.bg.type === BackgroundType.Color) {
      if (typeof slide.bg.color === "string") {
        pdf.setFillColor(slide.bg.color);
        pdf.rect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT, "F");
      } else {
      }
    } else {
      pdf.addImage(slide.bg.url, "JPEG", 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
    }

    //Объекты
    slide.elements.forEach((obj) => {
      if (obj.objectType === ObjectType.Text) {
        pdf.setFont(`${obj.fontName}`, "normal");
        pdf.setFontSize(obj.fontSize);
        pdf.setTextColor(obj.fontColor || "#000000");

        const lines = pdf.splitTextToSize(obj.content!, obj.size.width);

        pdf.text(lines, obj.pos.x, obj.pos.y);
      } else if (obj.objectType === ObjectType.Image) {
        pdf.addImage(obj.url, "JPEG", obj.pos.x, obj.pos.y, obj.size.width, obj.size.height);
      }
    });

    if (index < pres.slideCollection.length - 1) {
      pdf.addPage();
    }
  });

  function sanitizeFileName(fileName: string) {
    return fileName.replace(/[<>:"/\\|?*]+/g, "").trim();
  }

  const fileName = sanitizeFileName(pres.name || "presentation");
  pdf.save(`${fileName}.pdf`);
};

export default exportPdf;
