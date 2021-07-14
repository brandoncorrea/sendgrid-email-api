var htmlHelper = require('../helpers/htmlHelper');
var noteFormatter = require('../formatters/noteFormatter');

const appendContent = (doc, parsedContent) => {
  var content = doc.createElement('div');
  content.setAttribute('class', 'content');
  content.innerHTML = parsedContent;
  if (content.textContent.trim())
    doc.body.append(content);
}

const appendTitle = (doc, titleText) => {
  var title = doc.createElement('div');
  title.setAttribute('class', 'title');
  title.innerHTML = titleText;
  doc.body.append(title);
}

exports.build = noteRequest => {
  var doc = htmlHelper.newDocument();
  if (!noteRequest) return doc;
  var parsedContent = noteFormatter.format(noteRequest.content);
  if (parsedContent) appendContent(doc, parsedContent);
  if (noteRequest.title && noteRequest.title.trim()) appendTitle(doc, noteRequest.title);
  return doc;
}