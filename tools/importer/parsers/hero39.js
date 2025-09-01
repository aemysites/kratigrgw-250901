/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the background image (img.cover-image)
  let backgroundImg = null;
  const imgs = element.querySelectorAll('img');
  for (const img of imgs) {
    if (img.classList.contains('cover-image')) {
      backgroundImg = img;
      break;
    }
  }

  // 2. Find content cell: h1, p, CTA link/button
  // The content is in the column without the background image
  let contentCellElements = [];
  // Find an h1 (should be present in hero cell)
  const h1 = element.querySelector('h1');
  if (h1) contentCellElements.push(h1);
  // Find the parent container of h1 (content area)
  const contentArea = h1 ? h1.closest('div') : null;
  if (contentArea) {
    // Find paragraphs and button/link (CTA)
    // Paragraph(s)
    const paras = contentArea.querySelectorAll('p');
    for (const p of paras) {
      // Avoid picking up paragraphs that are not actually inside the hero content
      if (!contentCellElements.includes(p)) {
        contentCellElements.push(p);
      }
    }
    // CTA: a or button
    // The CTA is likely in a .button-group or similar
    const ctaGroups = contentArea.querySelectorAll('.button-group');
    for (const group of ctaGroups) {
      const ctas = group.querySelectorAll('a, button');
      for (const cta of ctas) {
        contentCellElements.push(cta);
      }
    }
  }

  // 3. Build the block table
  const cells = [
    ['Hero (hero39)'],
    [backgroundImg ? backgroundImg : ''],
    [contentCellElements.length > 0 ? contentCellElements : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
