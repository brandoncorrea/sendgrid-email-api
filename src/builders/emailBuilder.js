var htmlHelper = require('../helpers/htmlHelper');
var noteFormatter = require('../formatters/noteFormatter');

const appendContent = (doc, parsedContent) => {
  var content = doc.createElement('div');
  content.setAttribute('class', 'content');
  content.innerHTML = parsedContent;
  if (content.textContent.trim())
    doc.body.append(content);
}

exports.build = noteRequest => {
  var doc = htmlHelper.newDocument();
  var parsedContent = noteFormatter.format(noteRequest.content);
  if (parsedContent)
    appendContent(doc, parsedContent);
  return doc;
}