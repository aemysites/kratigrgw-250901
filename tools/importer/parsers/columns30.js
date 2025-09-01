/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns30)
  const headerRow = ['Columns block (columns30)'];

  // Find the columns container inside the element
  // The grid with three columns has class grid-layout desktop-3-column
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (!grid) return;

  // Get direct children of grid (the columns)
  const columns = Array.from(grid.children);

  // Edge case: If not exactly 3 columns, do nothing (since the block is for 3-column layout)
  if (columns.length !== 3) return;

  // Build the content row: each cell references the existing column element
  const contentRow = columns;

  // Build the table cells array
  const cells = [headerRow, contentRow];

  // Create the block table with the cells
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
