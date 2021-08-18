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
    if (headers.length) {
      console.log('header', headers[0]);
      return headers[0].innerHTML;
    }
  }

  return "Sermon Notes";
}

exports.build = html => 
  formatSubject(getTitleContent(html));