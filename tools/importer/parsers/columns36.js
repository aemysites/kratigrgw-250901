/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for main grid container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the main grid layout (columns wrapper)
  const gridLayout = container.querySelector(':scope > .grid-layout');
  if (!gridLayout) return;

  // The grid contains two main children: left (text/buttons), right (images)
  const columns = Array.from(gridLayout.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: includes heading, subheading, and buttons
  const leftCol = columns[0];
  // RIGHT COLUMN: includes a grid of images
  const rightCol = columns[1];
  // From rightCol, find the direct image grid (may vary by class names)
  let imgGrid = rightCol.querySelector('.grid-layout');
  if (!imgGrid) {
    // fallback: if no nested grid, search for images directly
    imgGrid = rightCol;
  }
  const images = Array.from(imgGrid.querySelectorAll('img'));
  // Defensive: if there are no images, leave cell empty

  // Block table construction
  const headerRow = ['Columns block (columns36)'];
  const cellsRow = [leftCol, images];
  const rows = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
