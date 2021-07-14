var htmlHelper = require('../helpers/htmlHelper');
var noteFormatter = require('../formatters/noteFormatter');
var metaFormatter = require('../formatters/metaFormatter');

// Creates a div with a class and inner HTML
const createContainer = (doc, className, innerHTML) => {
  var el = doc.createElement('div');
  el.setAttribute('class', className);
  el.innerHTML = innerHTML;
  return el;
}

// Adds the content element to the document
const appendContent = (doc, request) => {
  var parsedContent = noteFormatter.format(request.content);
  if (!parsedContent) return;
  var content = createContainer(doc, 'content', parsedContent);
  if (content.textContent.trim())
    doc.body.append(content);
}

// Adds the title element to the document
const appendTitle = (doc, request) => {
  if (request.title && request.title.trim())
    doc.body.append(
      createContainer(doc, 'title', request.title))
}

const appendMeta = (doc, request) => {
  var content = metaFormatter.format(request.author, request.date);
  if (content)
    doc.body.append(createContainer(doc, 'meta', content));
}

// Accepts a note request and builds an HTML document that can be sent in an email
exports.build = noteRequest => {
  var doc = htmlHelper.newDocument();
  if (!noteRequest) return doc;
  appendTitle(doc, noteRequest);
  appendMeta(doc, noteRequest);
  appendContent(doc, noteRequest);
  return doc;
}