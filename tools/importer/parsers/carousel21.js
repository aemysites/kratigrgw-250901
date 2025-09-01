/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with EXACT block name
  const headerRow = ['Carousel (carousel21)'];

  // Only one slide in this HTML. Find the slide container.
  const slideBody = element.querySelector('.card-body');
  if (!slideBody) return;

  // First cell: the image. Reference the image element directly.
  const img = slideBody.querySelector('img');

  // Second cell: text content (if any)
  const textElements = [];
  const heading = slideBody.querySelector('.h4-heading');
  if (heading && heading.textContent.trim()) {
    // Use a heading element for semantic meaning
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textElements.push(h2);
  }

  // If there is no text content, provide empty string as second cell
  const row = [img, textElements.length > 0 ? textElements : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
