const htmlHelper = require('../helpers/htmlHelper');

const formatSubject = text => {
  var subject = text
    .replace('\n', ' ')
    .replace('\t', ' ')
    .replace('\r', ' ');
  
  while(subject.includes('  '))
    subject = subject.replace('  ', ' ');

  return subject.trim();
}

const getTitleContent = html => {
  for (var i = 1; i <= 6; i++) {
    var tagName = `h${i}`;
    var headers = html.getElementsByTagName(tagName);
    if (headers.length)
      return headers[0].innerHTML;
  }

  return "Sermon Notes";
}

exports.build = html => {
  // Remove all breaks from the subject line
  var htmlContent = getTitleContent(html).replace('<br>', ' ');
  // Remove all remaining HTML elements
  var textContent = htmlHelper.parseHtml(htmlContent).body.textContent;
  return formatSubject(textContent);
}