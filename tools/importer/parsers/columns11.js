/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const outerGrid = element.querySelector('.grid-layout');
  if (!outerGrid) return;
  // Get its immediate children
  const gridChildren = Array.from(outerGrid.children);

  let leftCol = null;
  let rightCol = null;

  // There may be a nested grid holding the content, and an image
  for (const child of gridChildren) {
    if (child.classList.contains('container')) {
      // This is a nested grid holding the text content
      // Its child with class .section holds the actual content
      const section = child.querySelector('.section');
      if (section) {
        leftCol = section;
      }
    } else if (child.tagName === 'IMG') {
      rightCol = child;
    }
  }

  // Defensive: if we didn't find both, skip
  if (!leftCol && !rightCol) return;

  // Table header
  const headerRow = ['Columns block (columns11)'];
  // Table columns: always reference the existing DOM nodes
  const columnsRow = [];
  if (leftCol) columnsRow.push(leftCol);
  if (rightCol) columnsRow.push(rightCol);

  // Compose and replace
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
