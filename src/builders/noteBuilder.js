const fs = require('fs');
var htmlHelper = require('../helpers/htmlHelper');
var noteFormatter = require('../formatters/noteContentFormatter');
const { disconnect } = require('process');

// Creates a div with a class and inner HTML
const createContainer = (doc, className, innerHTML) => {
  var el = doc.createElement('div');
  el.setAttribute('class', className);
  el.innerHTML = innerHTML;
  return el;
}

// Adds the content element to the document
const appendContent = (doc, content) => {
  var parsedContent = noteFormatter.format(content);
  if (!parsedContent) return;
  var contentNode = createContainer(doc, 'content', parsedContent);
  if (contentNode.textContent.trim())
    doc.body.append(contentNode);
}

const addStyles = (doc, path) =>  {
  var style = doc.createElement('style');
  style.innerHTML = fs.readFileSync(path, 'utf8');
  doc.head.append(style);
}

// Accepts a note request and builds an HTML document that can be sent in an email
exports.build = content => {
  var doc = htmlHelper.newDocument();
  if (!content) return doc;
  appendContent(doc, content);
  addStyles(doc, __dirname + '/../styles/notes.css');
  return doc;
}