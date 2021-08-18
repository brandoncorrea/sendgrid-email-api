const noteBuilder = require('../builders/noteBuilder');
const sendgrid = require('../services/sendgrid.service');
const validator = require("email-validator");
const NoteRequest = require('../models/NoteRequest');
const subjectBuilder = require('../builders/subjectBuilder');

const sendEmailNote = (note, res) => {
  var noteDoc = noteBuilder.build(note.content);
  
  sendgrid.sendMail(
    note.recipient,
    subjectBuilder.build(noteDoc),
    noteDoc.documentElement.innerHTML
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

// Parses a request body into a note
const parseNote = req => {
  var note = new NoteRequest()
  note.recipient = req.body.recipient;
  note.content = req.body.content;
  return note;
}
 
// Sends an email note to the recipient
// Returns 400 if recipient is not a valid email
// Returns 500 on email API error
// Returns 200 when successful
module.exports.send = (req, res) => {
  var note = parseNote(req);

  // Validate to email
  if (!validator.validate(note.recipient)) {
    res.status(400);
    res.send('Email Address is invalid.');
  } else
    sendEmailNote(note, res);
}
