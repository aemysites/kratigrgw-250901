/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Cards (cards24)'];

  // Get all cards (direct children links)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Generate a row for each card
  const rows = cards.map(card => {
    // Image cell: take the image element inside the aspect div
    let imgEl = null;
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Text cell: tag + date + heading
    const textCellContent = [];
    // Tag and date row (flex)
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) textCellContent.push(tagRow);
    // Heading (h3)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textCellContent.push(heading);

    // Only fill with present elements (never null)
    return [imgEl, textCellContent];
  });

  // Build the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
