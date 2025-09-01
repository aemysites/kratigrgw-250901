/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the block info
  const headerRow = ['Columns block (columns16)'];

  // Get the container holding the main content
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Get the main two-column grid under the container
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainGridDivs = Array.from(mainGrid.children);
  // Defensive: expect two columns
  const leftCol = mainGridDivs[0];
  const rightCol = mainGridDivs[1];
  
  // Reference left column content directly
  const leftCellContent = leftCol ? leftCol : '';
  // Reference right column content directly
  const rightCellContent = rightCol ? rightCol : '';

  // Get the image grid after the main content
  // It's outside the mainGrid, as a sibling of container, as seen in the HTML
  // But in the provided HTML it's inside the same section as a sibling to .container
  let imagesGrid = null;
  let images = [];
  // Try to find the images grid as a child of the section (element)
  const grids = Array.from(element.querySelectorAll('.w-layout-grid.grid-layout'));
  // We want the one with .mobile-portrait-1-column
  for (const g of grids) {
    if (g.classList.contains('mobile-portrait-1-column')) {
      imagesGrid = g;
      break;
    }
  }
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // For robustness, fill with blank if less than two images
  const imageCell1 = images[0] || '';
  const imageCell2 = images[1] || '';
  
  // Compose the table rows as in the markdown structure (header, then 2 columns, then 2 images)
  const tableRows = [
    headerRow,
    [leftCellContent, rightCellContent],
    [imageCell1, imageCell2]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
