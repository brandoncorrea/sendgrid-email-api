exports.format = text => {
  var subject = text
    .replace('\n', ' ')
    .replace('\t', ' ')
    .replace('\r', ' ');
  
  while(subject.includes('  '))
    subject = subject.replace('  ', ' ');

  return subject.trim();
}
