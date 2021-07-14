/*
  Formatter for Sermon Notes
*/

const htmlHelper = require("../helpers/htmlHelper");

// Formats an HTML string for an emailed note
exports.format = htmlString => {
  if (!htmlString) htmlString = "";
  var html = htmlHelper.parseHtml(htmlString);
  htmlHelper.replaceElements(html, 'input', el => el.value);
  htmlHelper.replaceElements(html, 'textarea', el => el.innerHTML);
  return html.body.innerHTML;
}