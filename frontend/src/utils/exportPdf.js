import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Export table data as a PDF file.
 * @param {string} title - Title shown at the top of the PDF
 * @param {string[]} columns - Column header labels
 * @param {string[][]} rows - 2D array of cell values
 * @param {string} [filename] - Output file name (without .pdf)
 */
export function exportTablePdf(title, columns, rows, filename = 'export') {
  const doc = new jsPDF({ orientation: rows[0]?.length > 6 ? 'landscape' : 'portrait' });

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120);
  doc.text(`Generated on ${new Date().toLocaleString()}  •  ${rows.length} record${rows.length !== 1 ? 's' : ''}`, 14, 28);

  autoTable(doc, {
    startY: 34,
    head: [columns],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 30, 30],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    bodyStyles: {
      fontSize: 7.5,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      overflow: 'linebreak',
      lineWidth: 0.1,
    },
    margin: { top: 34, left: 14, right: 14 },
  });

  doc.save(`${filename}.pdf`);
}
