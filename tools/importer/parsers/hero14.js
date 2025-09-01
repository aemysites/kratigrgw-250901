/* global WebImporter */
export default function parse(element, { document }) {
  // Block header matches example exactly
  const headerRow = ['Hero (hero14)'];

  // --- Background image row ---
  // Look for an img inside the first grid cell
  let bgImg = null;
  // Get all immediate grid children
  const gridDivs = element.querySelectorAll('.w-layout-grid > div');
  if (gridDivs.length > 0) {
    const imageContainer = gridDivs[0];
    bgImg = imageContainer.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Text content row ---
  // Find the text container (second grid cell)
  let textElements = [];
  if (gridDivs.length > 1) {
    const textContainer = gridDivs[1];
    // Get all heading (h1-h6), paragraph (p), and button/a children
    // Only immediate children are typical for hero blocks
    textElements = Array.from(textContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button'));
  }
  // If there are no text elements, cell is blank
  const textRow = [textElements.length ? textElements : ''];

  // Compose rows for the block table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
