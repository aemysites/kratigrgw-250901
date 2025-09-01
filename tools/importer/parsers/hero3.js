/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match exactly
  const headerRow = ['Hero (hero3)'];

  // Row 2: Background Image
  // Get the cover image directly from the element
  const bgImg = element.querySelector('img.cover-image');
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: Headline, subheading, call-to-action
  // Find the card that contains all text/button content
  const card = element.querySelector('.card');
  // We use the card element directly for maximum resilience and semantic preservation
  const contentRow = [card ? card : ''];

  // Assemble the table as per the required structure
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
