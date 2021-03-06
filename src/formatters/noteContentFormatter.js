/*
  Formatter for Sermon Notes
*/

const htmlHelper = require("../helpers/htmlHelper");

const removeButtons = html => {
  var inputs = html.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++)
    if (inputs[i].getAttribute('type') === 'button')
      inputs[i].outerHTML = '';

  var buttons = html.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++)
    buttons[i].outerHTML = '';
}

const filterContent = (content, find, replace) => {
  while(content.includes(find))
    content = content.replace(find, replace);
  return content;
}

const filterWhitespace = html => {
  var content = html.body.innerHTML;
  content = filterContent(content, '\n', '');
  content = filterContent(content, '  ', ' ');
  content = filterContent(content, '\t', '');
  content = filterContent(content, '> ', '>');
  content = filterContent(content, ' <', '<');
  html.body.innerHTML = content.trim();
}

// Formats an HTML string for an emailed note
exports.format = htmlString => {
  if (!htmlString) htmlString = "";
  var html = htmlHelper.parseHtml(htmlString);
  removeButtons(html);
  htmlHelper.replaceElements(html, 'input', el => el.value);
  htmlHelper.replaceElements(html, 'textarea', el => el.innerHTML);
  htmlHelper.replaceElements(html, 'select', el => el.options[el.selectedIndex].text);
  htmlString = filterWhitespace(html);
  return html.body.innerHTML;
}
