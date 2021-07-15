var noteBuilder = require('../builders/sermonNoteBuilder');
var sendgrid = require('../services/sendgrid.service');

module.exports.send = (req, res) => {
  sendgrid.sendMail(
    'bwancor@gmail.com',
    'test@noreply.com',
    'Test Email',
    '<div>Content</div>'
  )
  .then(response => res.status(200))
  .catch(err => {
    res.status(500);
    res.send(err);
  });
}
