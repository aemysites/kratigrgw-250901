/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Carousel (carousel17)'];

  // Get the slides container
  const grid = element.querySelector('.grid-layout');
  if (!grid) {
    // If grid is missing, do nothing
    return;
  }

  // Get all immediate children of grid (each slide)
  const slideDivs = Array.from(grid.children);

  // For each slide, extract the image only (first img descendant)
  // The second column should be empty as there is no text content in the HTML
  const rows = slideDivs
    .map((slide) => {
      const img = slide.querySelector('img');
      // Defensive: If no image, skip this slide
      if (!img) return null;
      return [img, ''];
    })
    .filter(Boolean);

  // If no slides, do nothing
  if (!rows.length) {
    return;
  }

  // Build table data
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
