import { jsPDF } from "jspdf";

export async function generatePdf(currentReport) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth, fontSize = 10, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text || "—", maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * fontSize * 0.35; // Return new Y position
  };

  // ===== FIRST PAGE: COVER =====

  // Title
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Átvételi riport", margin, yPosition);
  yPosition += 15;

  // Report ID
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Riport azonosító:", margin, yPosition);
  yPosition += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(currentReport.reportId, margin, yPosition);
  yPosition += 10;

  // Created at
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Létrehozva: ${currentReport.createdAt}`, margin, yPosition);
  yPosition += 5;

  // Closed at
  doc.text(`Lezárva: ${currentReport.lezartAt || "—"}`, margin, yPosition);
  yPosition += 10;

  // Status badge
  const status = currentReport.statusz;
  let statusText = "";
  let statusColor = [0, 0, 0];

  if (status === "rendben") {
    statusText = "RENDBEN";
    statusColor = [34, 197, 94]; // Green
  } else if (status === "serules") {
    statusText = "SÉRÜLÉS JELZETT";
    statusColor = [239, 68, 68]; // Red
  }

  if (statusText) {
    doc.setFillColor(...statusColor);
    doc.roundedRect(margin, yPosition, 60, 10, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(statusText, margin + 30, yPosition + 6.5, { align: "center" });
    doc.setTextColor(0, 0, 0);
    yPosition += 15;
  }

  // Fuvar adatai section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Fuvar adatai", margin, yPosition);
  yPosition += 8;

  const fuvar = currentReport.fuvar;
  const fields = [
    { label: "Rendszám", value: fuvar.rendszam },
    { label: "Rakodás vezető", value: fuvar.rakodasVezeto },
    { label: "Szállítólevél", value: fuvar.szallitolevel },
    { label: "Cég", value: fuvar.ceg },
    { label: "Telephely", value: fuvar.telephely },
    { label: "CMR szám", value: fuvar.cmrSzam },
    { label: "Átvevő neve", value: currentReport.atvevoNev },
  ];

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  fields.forEach((field) => {
    doc.setTextColor(100, 100, 100);
    doc.text(field.label, margin, yPosition);
    yPosition += 4;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(field.value || "—", margin, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 7;
  });

  yPosition += 5;

  // Összefoglaló section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Összefoglaló megjegyzés", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  const osszefoglaloLines = doc.splitTextToSize(
    currentReport.osszefoglalo || "—",
    contentWidth
  );
  doc.text(osszefoglaloLines, margin, yPosition);

  // ===== PHOTO PAGES =====

  const photos = currentReport.fotos || [];

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];

    // Add new page for each photo
    doc.addPage();
    yPosition = margin;

    // Try to load and add the image
    try {
      const img = await loadImage(photo.imageUrl);

      // Calculate image dimensions to fit within content area
      const maxImgWidth = contentWidth;
      const maxImgHeight = 180; // Leave space for text below

      let imgWidth = img.width;
      let imgHeight = img.height;

      // Scale down if needed
      const ratio = Math.min(
        maxImgWidth / imgWidth,
        maxImgHeight / imgHeight,
        1
      );

      imgWidth = imgWidth * ratio;
      imgHeight = imgHeight * ratio;

      // Center the image horizontally
      const imgX = margin + (contentWidth - imgWidth) / 2;

      doc.addImage(
        photo.imageUrl,
        "JPEG",
        imgX,
        yPosition,
        imgWidth,
        imgHeight
      );

      yPosition += imgHeight + 8;
    } catch (error) {
      console.error("Error loading image:", error);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("[Kép nem betölthető]", margin, yPosition);
      yPosition += 10;
      doc.setTextColor(0, 0, 0);
    }

    // Timestamp
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(photo.timestamp || "", margin, yPosition);
    yPosition += 7;

    // Note
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    const noteLines = doc.splitTextToSize(
      photo.megjegyzes || "—",
      contentWidth
    );
    doc.text(noteLines, margin, yPosition);
  }

  // ===== FOOTER ON LAST PAGE =====

  const pageCount = doc.internal.getNumberOfPages();
  doc.setPage(pageCount);

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);

  const footerText =
    "Ez a riport a szállítmány beérkezési állapotát dokumentálja az LGI telephelyén. Belső felhasználásra.";
  const footerLines = doc.splitTextToSize(footerText, contentWidth);
  const footerY = pageHeight - margin - footerLines.length * 3;
  doc.text(footerLines, margin, footerY);

  // Save the PDF
  doc.save(`${currentReport.reportId}.pdf`);
}

// Helper function to load images
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
