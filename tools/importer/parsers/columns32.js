/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Find all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have at least 2 columns
  if (columns.length < 2) return;

  // Table header matches spec (no variants)
  const headerRow = ['Columns block (columns32)'];
  // The second row: one cell for each column's content (image and content block)
  const columnsRow = [columns[0], columns[1]];

  // Build the block table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
