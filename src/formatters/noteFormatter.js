/*
  Formatter for Sermon Notes
*/

const xmlHelper = require("../helpers/xmlHelper");

// Replaces HTML tags with their value property
const replaceWithValue = (html, tagName) => {
  var elements = html.getElementsByTagName(tagName);
  while(elements.length) {
    var text = html.createTextNode(elements[0].value);
    elements[0].parentElement.replaceChild(text, elements[0]);
    var elements = html.getElementsByTagName(tagName);
  }
}

// Formats an HTML string for an emailed note
exports.format = htmlString => {
  if (!htmlString) htmlString = "";
  var html = xmlHelper.stringToHtml(htmlString);
  replaceWithValue(html, 'input');
  return xmlHelper.xmlToString(html);
}