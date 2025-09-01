/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the block specification
  const headerRow = ['Hero (hero35)'];

  // Row 2: Background image (optional, not present in this HTML)
  const bgRow = [''];

  // Row 3: Content (title, subheading, CTA)
  let contentParts = [];

  // Find the .container (guaranteed by the example HTML)
  const container = element.querySelector('.container');
  if (container) {
    // Find the grid layout inside container
    const grid = container.querySelector('.grid-layout');
    if (grid) {
      // Get immediate children of the grid (these contain the main content and CTA)
      const sections = Array.from(grid.children);
      // Find the content (with heading/subheading) and CTA (button) elements
      let mainContent = null;
      let ctaContent = null;
      sections.forEach((child) => {
        // Heading/subheading block (contains h1/h2/h3...)
        if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
          mainContent = child;
        }
        // CTA block (a.button)
        if (
          child.tagName === 'A' && child.classList.contains('button')
        ) {
          ctaContent = child;
        }
      });
      if (mainContent) contentParts.push(mainContent);
      if (ctaContent) contentParts.push(ctaContent);
    }
  }

  // If nothing found, preserve fallback for edge cases (like empty or unexpected structure)
  if (contentParts.length === 0) {
    // Just in case, take the whole element content if missing
    contentParts = [element];
  }

  // Compose the block table (one column, three rows)
  const cells = [
    headerRow,
    bgRow,
    [contentParts]
  ];

  // Generate and replace with block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
