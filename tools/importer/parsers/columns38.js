/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div')).filter(Boolean);
  // Header row: exactly one column, as per example
  const headerRow = ['Columns block (columns38)'];
  // Content row: each column's content in its own cell
  const contentRow = columns;
  // Assemble cells: header row with 1 column, then content row with N columns
  const cells = [headerRow, contentRow];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
