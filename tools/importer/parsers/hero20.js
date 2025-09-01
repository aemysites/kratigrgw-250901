/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero (hero20)'];

  // --- 2nd row: Background Images ---
  // Find the correct images grid (contains the collage)
  let imageGrid = null;
  const grids = element.querySelectorAll('.grid-layout');
  // Prefer grid with multiple imgs (collage)
  for (const grid of grids) {
    const imgs = grid.querySelectorAll('img');
    if (imgs.length > 2) {
      imageGrid = grid;
      break;
    }
  }
  let backgroundImages = [];
  if (imageGrid) {
    // All img elements as-is
    backgroundImages = Array.from(imageGrid.querySelectorAll('img'));
  }
  // If no images, gracefully handle with empty array
  const backgroundRow = [backgroundImages.length > 0 ? backgroundImages : ''];

  // --- 3rd row: Headline, subheading, CTA ---
  // Find content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  const heroContent = [];
  if (contentContainer) {
    // Headline (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) heroContent.push(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) heroContent.push(subheading);
    // CTA group (contains all CTAs)
    const btnGroup = contentContainer.querySelector('.button-group');
    if (btnGroup) heroContent.push(btnGroup);
  }
  // If nothing found, fill with blank
  const contentRow = [heroContent.length > 0 ? heroContent : ''];

  // --- Assemble block table ---
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
