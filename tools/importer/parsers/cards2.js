/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards2)'];
  const cells = [headerRow];

  // Get the main grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 1. Main card (large image & main text)
  const mainCard = grid.children[0]; // Should be the big left card anchor
  if (mainCard && mainCard.matches('a.utility-link-content-block')) {
    // Image
    const imgWrapper = mainCard.querySelector('.utility-aspect-1x1');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Compose text content
    const cardParts = [];
    const tagGroup = mainCard.querySelector('.tag-group');
    if (tagGroup) cardParts.push(tagGroup);
    const heading = mainCard.querySelector('h3');
    if (heading) cardParts.push(heading);
    const para = mainCard.querySelector('p');
    if (para) cardParts.push(para);

    cells.push([
      img || '',
      cardParts.length > 1 ? cardParts : (cardParts[0]||'')
    ]);
  }

  // 2. Cards with images in the right top block
  const flexBlocks = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (flexBlocks[0]) {
    const cardLinks = flexBlocks[0].querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(link => {
      const imgWrapper = link.querySelector('.utility-aspect-3x2');
      const img = imgWrapper ? imgWrapper.querySelector('img') : null;
      const cardParts = [];
      const tagGroup = link.querySelector('.tag-group');
      if (tagGroup) cardParts.push(tagGroup);
      const heading = link.querySelector('h3');
      if (heading) cardParts.push(heading);
      const para = link.querySelector('p');
      if (para) cardParts.push(para);
      cells.push([
        img || '',
        cardParts.length > 1 ? cardParts : (cardParts[0]||'')
      ]);
    });
  }

  // 3. Cards with text only in lower right block
  if (flexBlocks[1]) {
    flexBlocks[1].querySelectorAll('a.utility-link-content-block').forEach(link => {
      const cardParts = [];
      const heading = link.querySelector('h3');
      if (heading) cardParts.push(heading);
      const para = link.querySelector('p');
      if (para) cardParts.push(para);
      cells.push([
        '',
        cardParts.length > 1 ? cardParts : (cardParts[0]||'')
      ]);
    });
  }

  // Create block table and replace original
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
