const jsdom = require("jsdom");

exports.newDocument = () =>
  (new jsdom.JSDOM()).window.document;

// Converts a string to an HTML document
exports.parseHtml = xmlString =>
  (new jsdom.JSDOM(xmlString)).window.document;

// Removes an element from its parent
exports.removeElement = element =>
  element.outerHTML = '';
  //element.parentElement.removeChild(element);

// Replaces an element with text content
exports.replaceElement = (html, element, content) =>
  element.parentElement.replaceChild(
    html.createTextNode(content), 
    element);

// Applies a method to all elements with a given tag name
exports.applyElements = (html, tagName, apply) => {
  var elements = html.getElementsByTagName(tagName);
  while (elements.length) {
    apply(html, elements[0]);
    var elements = html.getElementsByTagName(tagName);
  }
}

// Replaces an HTML element with the content
exports.replaceContent = (html, element, content) => {
  if (content)
    this.replaceElement(html, element, content);
  else
    this.removeElement(element);
}

// Replaces HTML elements with the tag name using a value based on the selector
exports.replaceElements = (html, tagName, selector) => 
  this.applyElements(html, tagName, 
    (doc, el) => this.replaceContent(doc, el, selector(el)))

