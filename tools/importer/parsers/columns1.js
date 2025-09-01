/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate child nodes of the grid (columns)
  const columns = Array.from(grid.children);
  // Defensive: Only add columns if they have usable content
  const contentCols = columns.filter(col => {
    // skip empty nodes
    if (col.nodeType !== 1) return false;
    if (col.tagName === 'IMG') return true;
    // For divs, check if they have at least one child node
    return col.textContent.trim() !== '' || col.querySelector('img,video,p,h1,h2,h3,h4,h5,h6,a,button');
  });

  // Build the table rows
  const rows = [];
  rows.push(['Columns block (columns1)']);
  if (contentCols.length) {
    rows.push(contentCols);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
