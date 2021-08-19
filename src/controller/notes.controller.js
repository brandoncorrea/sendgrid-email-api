const noteBuilder = require('../builders/noteBuilder');
const sendgrid = require('../services/sendgrid.service');
const validator = require("email-validator");
const subjectBuilder = require('../builders/subjectBuilder');
var he = require('he');

const sendEmailNote = (note, res) => {
  var noteDoc = noteBuilder.build(note.content);
  
  sendgrid.sendMail(
    note.recipient,
    subjectBuilder.build(noteDoc),
    he.decode(noteDoc.documentElement.innerHTML)
  )
  .then(response => {
    res.status(200)
    res.send(response)
  })
  .catch(err => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
}

// Sends an email note to the recipient
// Returns 400 if recipient is not a valid email
// Returns 500 on email API error
// Returns 200 when successful
module.exports.send = (req, res) => {
  var note = {
    recipient: req.body.recipient,
    content: req.body.content
  }

  // Validate to email
  if (!validator.validate(note.recipient)) {
    res.status(400);
    res.send('Invalid email');
  } else
    sendEmailNote(note, res);
}
