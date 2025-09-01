/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block, as in the example
  const headerRow = ['Carousel (carousel12)'];

  // Find the relevant grid that holds the carousel slide content
  const mainGrid = element.querySelector('.card-body .grid-layout');
  if (!mainGrid) return;

  // The grid contains exactly two elements: image and content div
  let slideImage = null;
  let slideContent = null;
  const gridChildren = Array.from(mainGrid.children);
  for (let child of gridChildren) {
    if (child.tagName === 'IMG') {
      slideImage = child;
    } else if (child.tagName === 'DIV') {
      slideContent = child;
    }
  }

  // Make sure we have an image. If not, gracefully degrade.
  if (!slideImage) return;

  // Compose the right column: heading, paragraphs, CTA button
  const textCellContent = [];
  if (slideContent) {
    // Heading (use original heading element)
    const heading = slideContent.querySelector('h2, h1, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);
    // Gather all description paragraphs (not inside buttons)
    // These are p tags
    const paragraphs = Array.from(slideContent.querySelectorAll('p'));
    paragraphs.forEach(p => textCellContent.push(p));
    // Call-to-action button (use the <a> element directly if present)
    const button = slideContent.querySelector('a.button');
    if (button) textCellContent.push(button);
  }

  // Build block rows
  const rows = [
    headerRow,
    [slideImage, textCellContent]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
