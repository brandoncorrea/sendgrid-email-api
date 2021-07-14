const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const formatAuthor = author => {
  var parts = author.split(' ');
  for (var i = 0; i < parts.length; i++)
    parts[i] = parts[i][0].toUpperCase() + parts[i].substring(1);
  return parts.join(' ');
}

const formatDate = date => 
  `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

exports.format = (author, date) => {
  if (author && author.trim()) 
    return formatAuthor(author);
  if (date)
    return formatDate(date);
  return '';
}