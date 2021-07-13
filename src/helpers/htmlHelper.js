// Replaces an element with text content
exports.replaceElement = (html, element, content) => 
  element.parentElement.replaceChild(
    html.createTextNode(content), 
    element);

// Removes an element from its parent
exports.removeElement = element => 
  element.parentElement.removeChild(element);

// Applies a method to all elements with a given tag name
exports.applyElements = (html, tagName, apply) => {
  var elements = html.getElementsByTagName(tagName);
  while (elements.length) {
    apply(html, elements[0]);
    var elements = html.getElementsByTagName(tagName);
  }
}
