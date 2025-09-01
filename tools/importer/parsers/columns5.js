/* global WebImporter */
export default function parse(element, { document }) {
  // Create the correct header row as a single cell array
  const headerRow = ['Columns block (columns5)'];

  // Get all direct child column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, aggregate all its direct children (such as img, text, buttons, etc)
  // For this HTML, there is only one child per column (the img), but we generalize for future-proofing
  const secondRowCells = columns.map(col => {
    // For each column, gather all its content as an array
    // If the column has only one child, use that element directly. Otherwise, use an array of elements
    const children = Array.from(col.childNodes).filter(node => {
      // Only include elements and text nodes with non-whitespace
      return (node.nodeType === Node.ELEMENT_NODE) ||
             (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
    });
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      // Edge case: empty column
      return '';
    }
  });

  // Compose table rows: header, then columns in second row
  const tableRows = [headerRow, secondRowCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
