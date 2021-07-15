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
  if (!author || !author.trim()) return '';
  var parts = author.split(' ').filter(i => i.length > 0);
  for (var i = 0; i < parts.length; i++)
    parts[i] = parts[i][0].toUpperCase() + parts[i].substring(1);
  return parts.join(' ');
}

const formatDate = date => 
  date 
  ? `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  : ''

exports.format = (author, date) => {
  var formattedAuthor = formatAuthor(author);
  var formattedDate = formatDate(date);
  if (formattedAuthor && formattedDate)
    return `${formattedAuthor} | ${formattedDate}`;
  else if (formattedAuthor)
    return formattedAuthor;
  return formattedDate;
}
