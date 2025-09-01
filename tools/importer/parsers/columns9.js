/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Columns block (columns9)'];

  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) {
    // If not found, fallback to empty columns
    const table = WebImporter.DOMUtils.createTable([headerRow, ['']], document);
    element.replaceWith(table);
    return;
  }

  // Get immediate children of the grid as columns
  const columns = Array.from(grid.children);
  const secondRow = columns.map(col => col);

  // Compose the cells: first row is header (ONE column!), second row is columns
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
