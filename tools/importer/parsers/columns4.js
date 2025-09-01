/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (holds the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid - these are the columns
  const columns = Array.from(grid.children);

  // The header row must be a single cell, regardless of the column count
  const headerRow = ['Columns block (columns4)'];

  // Content row: one cell for each column
  const contentRow = columns.map(col => col);

  // Build the table with a single-cell header row and N-cell content row
  const cells = [
    headerRow, // 1 cell
    contentRow // N cells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
