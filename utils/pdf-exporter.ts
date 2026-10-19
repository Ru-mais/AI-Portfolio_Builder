import jsPDF from "jspdf";
import { toCanvas } from "html-to-image";
import { toast } from "sonner";
import { FormData, generatePortfolioHTML } from "@/utils/template-generator";

export interface PDFExportOptions {
  filename?: string;
  templateId?: string;
  primaryColor?: string;
}

/**
 * Downloads a multi-page PDF file directly in the browser using html-to-image and jsPDF.
 * html-to-image uses native browser SVG foreignObject rendering, providing 100% native
 * support for modern CSS Color 4 functions (such as oklch used in Tailwind v4).
 */
export async function downloadDirectPDF(
  targetElement: HTMLElement | null,
  options: PDFExportOptions = {}
): Promise<boolean> {
  if (!targetElement) {
    toast.error("Portfolio preview element not found.");
    return false;
  }

  const filename = (options.filename || "portfolio")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_");

  const isNeo = options.templateId === "neo";
  const bgColor = isNeo ? "#ffffff" : "#050505";
  const toastId = toast.loading("Generating direct PDF... Slicing portfolio pages.");

  // Store elements whose styles we temporarily modify for crisp capture
  const modifiedElements: {
    el: HTMLElement;
    opacity: string;
    transform: string;
    transition: string;
  }[] = [];

  try {
    // 1. Temporarily force all stagger-reveal items to full opacity and reset transform
    const staggerItems = targetElement.querySelectorAll<HTMLElement>(".stagger-item");
    staggerItems.forEach((el) => {
      modifiedElements.push({
        el,
        opacity: el.style.opacity,
        transform: el.style.transform,
        transition: el.style.transition,
      });
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.transition = "none";
    });

    // 2. Calculate full content height
    const fullHeight = targetElement.scrollHeight || targetElement.offsetHeight || 2000;

    // 3. Render to canvas at canonical 1440px desktop width using html-to-image
    const canvas = await toCanvas(targetElement, {
      width: 1440,
      height: fullHeight,
      pixelRatio: 1.5,
      backgroundColor: bgColor,
      style: {
        transform: "none",
        width: "1440px",
        height: `${fullHeight}px`,
        margin: "0",
        maxWidth: "none",
      },
      // Exclude WebGL particle canvases and floating action buttons
      filter: (domNode) => {
        if (domNode.tagName === "CANVAS") return false;
        if (domNode.id === "canvas-container") return false;
        if (domNode.classList && domNode.classList.contains("no-print")) return false;
        return true;
      },
      imagePlaceholder:
        "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23111'/%3E",
    });

    // 4. Compile multi-page A4 PDF using jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const pageCanvasHeight = Math.floor((canvas.width * pdfHeight) / pdfWidth);
    const totalCanvasHeight = canvas.height;

    let currentY = 0;
    let pageIndex = 0;

    while (currentY < totalCanvasHeight) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      const sliceHeight = Math.min(pageCanvasHeight, totalCanvasHeight - currentY);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = pageCanvasHeight;
      const ctx = sliceCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          currentY,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );
      }

      const sliceDataUrl = sliceCanvas.toDataURL("image/jpeg", 0.93);
      pdf.addImage(sliceDataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");

      currentY += pageCanvasHeight;
      pageIndex++;
    }

    pdf.save(`${filename}_portfolio.pdf`);
    toast.success("PDF portfolio downloaded successfully!", { id: toastId });
    return true;
  } catch (error) {
    console.error("Direct PDF generation error:", error);
    toast.error(
      "Direct PDF generation encountered an issue. You can use 'Print Preview' for a guaranteed vector PDF.",
      { id: toastId }
    );
    return false;
  } finally {
    // Restore original styles
    modifiedElements.forEach(({ el, opacity, transform, transition }) => {
      el.style.opacity = opacity;
      el.style.transform = transform;
      el.style.transition = transition;
    });
  }
}

/**
 * Triggers the browser's native print engine with custom @media print rules.
 * This produces 100% vector-sharp text, clickable hyperlinks, and clean page breaks.
 */
export function printPortfolioToPDF(formData: FormData): void {
  const toastId = toast.loading("Preparing high-fidelity PDF print preview...");

  try {
    const html = generatePortfolioHTML(formData);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.title = "Print Preview";

    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      throw new Error("Unable to access iframe document");
    }

    doc.open();
    doc.write(html);
    doc.close();

    let printTriggered = false;

    const doPrint = () => {
      if (printTriggered) return;
      printTriggered = true;
      toast.dismiss(toastId);

      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (printErr) {
        console.warn("Iframe print blocked, falling back to popup window:", printErr);
        const win = window.open("", "_blank");
        if (win) {
          win.document.write(html);
          win.document.close();
          win.focus();
          setTimeout(() => win.print(), 500);
        }
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2500);
      }
    };

    if (iframe.contentWindow) {
      iframe.contentWindow.onload = () => {
        setTimeout(doPrint, 600);
      };
      setTimeout(doPrint, 1500);
    } else {
      setTimeout(doPrint, 800);
    }
  } catch (error) {
    console.error("Print error:", error);
    toast.error("Failed to launch print interface.", { id: toastId });
  }
}
