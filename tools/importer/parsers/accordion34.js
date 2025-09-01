/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as specified
  const cells = [['Accordion (accordion34)']];

  // Find all direct children that are accordion items
  const accordionItems = element.querySelectorAll(':scope > div.accordion');

  accordionItems.forEach(item => {
    // Title: find the title text element
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = '';
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        title = titleEl;
      }
    }
    // Content: find the rich text content for the accordion item
    let content = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Find the direct container of rich content (usually a div.rich-text)
      const richText = nav.querySelector('.rich-text');
      if (richText) {
        content = richText;
      } else {
        // fallback to entire nav content if rich text missing
        content = nav;
      }
    }
    cells.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
