const formatAuthor = author => {
  var parts = author.split(' ');
  for (var i = 0; i < parts.length; i++)
    parts[i] = parts[i][0].toUpperCase() + parts[i].substring(1);
  return parts.join(' ');
}

exports.format = (author, date) => {
  if (author && author.trim()) 
    return formatAuthor(author);
  return '';
}