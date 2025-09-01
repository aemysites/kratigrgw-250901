/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, must match exactly
  const headerRow = ['Columns block (columns18)'];

  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Find the left/top content (text block), the ul (contacts), and the image
  // The structure is: [text block div, ul (contacts), img]
  // But we must be flexible in case order changes, so:
  let textBlock = null;
  let contactsList = null;
  let imageBlock = null;
  columns.forEach(el => {
    if (el.tagName === 'DIV' && !textBlock) {
      textBlock = el;
    } else if (el.tagName === 'UL' && !contactsList) {
      contactsList = el;
    } else if (el.tagName === 'IMG' && !imageBlock) {
      imageBlock = el;
    }
  });

  // Compose the left column: textBlock and contactsList
  // Only include if they exist
  const leftColContent = [];
  if (textBlock) leftColContent.push(textBlock);
  if (contactsList) leftColContent.push(contactsList);
  // Compose the right column: image block
  const rightColContent = imageBlock ? imageBlock : '';

  // Construct the table with two columns per row as per the description and the example
  const cells = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
