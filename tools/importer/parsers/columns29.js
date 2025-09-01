/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns (direct children with images)
  const columnDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  const columns = columnDivs.length ? columnDivs : element.querySelectorAll(':scope > div');
  const contentRow = Array.from(columns).map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Create the table manually to set colspan on header
  const table = document.createElement('table');
  // Header row with colspan
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns block (columns29)';
  th.colSpan = contentRow.length > 0 ? contentRow.length : 1;
  trHeader.appendChild(th);
  table.appendChild(trHeader);
  // Content row with each image in its own cell
  const trContent = document.createElement('tr');
  contentRow.forEach(cell => {
    const td = document.createElement('td');
    if (cell) td.append(cell);
    trContent.appendChild(td);
  });
  table.appendChild(trContent);

  element.replaceWith(table);
}
