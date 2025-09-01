/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;
  // Create the table manually to allow header colspan
  const table = document.createElement('table');
  // Header row with single cell spanning all columns
  const theadTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns block (columns31)';
  th.setAttribute('colspan', columns.length);
  theadTr.appendChild(th);
  table.appendChild(theadTr);
  // Content row
  const contentTr = document.createElement('tr');
  columns.forEach(col => {
    const td = document.createElement('td');
    td.append(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);
  element.replaceWith(table);
}
