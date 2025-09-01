/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  // Header row: one cell only (length 1), should span all columns
  const headerRow = ['Columns block (columns7)'];
  // Content row: one cell per column
  const contentRow = columns;
  // Table structure: header row is one cell, content row has as many cells as columns
  const tableData = [ headerRow, contentRow ];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
