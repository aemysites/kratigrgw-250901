/* global WebImporter */
export default function parse(element, { document }) {
  // Extract container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get heading and quote for left top
  const heading = container.querySelector('p.h2-heading');
  const quote = container.querySelector('p.paragraph-lg');
  const leftColTop = document.createElement('div');
  if (heading) leftColTop.appendChild(heading);
  if (quote) leftColTop.appendChild(quote);

  // Find the nested grid holding reviewer and logo
  const outerGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-landscape-1-column');
  let reviewerBlock = null;
  let logoBlock = null;

  if (outerGrid) {
    const children = Array.from(outerGrid.children);
    for (const child of children) {
      if (!reviewerBlock && child.querySelector('.avatar')) {
        reviewerBlock = child;
      }
      if (!logoBlock && child.querySelector('svg')) {
        logoBlock = child;
      }
    }
  }

  // Table structure: header row, then 2 rows with 2 columns each
  const cells = [
    ['Columns block (columns26)'],
    [leftColTop, ''],
    [reviewerBlock || '', logoBlock || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
