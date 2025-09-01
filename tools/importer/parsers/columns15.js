/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid layout with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  // Find first non-img child as left column and first img child as right column
  let leftCol = null;
  let rightCol = null;

  // Prioritize semantic content on left, image on right
  children.forEach(child => {
    if (!leftCol && child.querySelector('h1')) {
      leftCol = child;
    }
    if (!rightCol && child.tagName.toLowerCase() === 'img') {
      rightCol = child;
    }
  });

  // Fallbacks if not found by rules above
  if (!leftCol) {
    leftCol = children[0];
  }
  if (!rightCol) {
    rightCol = children.find(c => c.querySelector('img'));
    if (rightCol) {
      rightCol = rightCol.querySelector('img');
    } else {
      // If no image found, use the second column
      rightCol = children[1];
    }
  }

  // Compose table according to required structure
  const cells = [
    ['Columns block (columns15)'],
    [leftCol, rightCol]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
