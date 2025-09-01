/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Expecting two children: content column, image column
  let contentCol = null;
  let imageCol = null;
  // If more than two children, fallback to use first non-img as content, first img as image
  const children = Array.from(grid.children);
  for (const child of children) {
    if (!contentCol && child.tagName !== 'IMG') {
      contentCol = child;
    } else if (!imageCol && child.tagName === 'IMG') {
      imageCol = child;
    }
  }
  // Defensive: if one of columns missing, create empty cell
  const tableRow = [];
  tableRow.push(contentCol || document.createElement('div'));
  tableRow.push(imageCol || document.createElement('div'));

  const headerRow = ['Columns block (columns27)'];
  const cells = [headerRow, tableRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
