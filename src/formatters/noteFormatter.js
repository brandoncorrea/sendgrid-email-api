/*
  Formatter for Sermon Notes
*/

const htmlHelper = require("../helpers/htmlHelper");

// Replaces an element with its value property
const replaceWithValue = (html, element) => {
  if (element.hasAttribute('value'))
    htmlHelper.replaceElement(html, element, element.value);
  else
    htmlHelper.removeElement(element);
}

// Replaces an elemnt with its inner HTML
const replaceWithInnerHtml = (html, element) => {
  if (element.innerHTML !== '')
    htmlHelper.replaceElement(html, element, element.innerHTML);
  else
    htmlHelper.removeElement(element);
}

// Formats an HTML string for an emailed note
exports.format = htmlString => {
  if (!htmlString) htmlString = "";
  var html = htmlHelper.parseHtml(htmlString);
  htmlHelper.applyElements(html, 'input', replaceWithValue);
  htmlHelper.applyElements(html, 'textarea', replaceWithInnerHtml);
  return html.body.innerHTML;
}