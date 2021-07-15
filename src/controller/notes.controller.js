const noteBuilder = require('../builders/sermonNoteBuilder');
const sendgrid = require('../services/sendgrid.service');
var validator = require("email-validator");

const sendEmailNote = (body, res) =>
  sendgrid.sendMail(
    body.recipient,
    body.title,
    noteBuilder.build(body).documentElement.innerHTML
  )
  .then(response => {
    console.log('response', response);
    res.status(200)
  })
  .catch(err => {
    console.error(err);
    res.status(500);
    res.send(err);
  });
 
// Sends an email note to the recipient
// Returns 400 if recipient is not a valid email
// Returns 500 on email API error
// Returns 200 when successful
module.exports.send = (req, res) => {
  if (!validator.validate(req.body.recipient)) {
    res.status(400);
    res.send('bad request');
  }
  else
    sendEmailNote(req.body, res)
}
