const noteBuilder = require('../builders/noteBuilder');
const sendgrid = require('../services/sendgrid.service');
const validator = require("email-validator");
const subjectFormatter = require('../formatters/subjectFormatter');
const NoteRequest = require('../models/NoteRequest');

const sendEmailNote = (note, res) =>
  sendgrid.sendMail(
    note.recipient,
    subjectFormatter.format(note.title),
    noteBuilder.build(note).documentElement.innerHTML
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

// Parses a request body into a note
const parseNote = req => {
  var note = new NoteRequest()
  note.recipient = req.body.recipient;
  note.author = req.body.author;
  note.content = req.body.content;
  note.title = req.body.title;
  var timestamp = Date.parse(req.body.date);
  if (!isNaN(timestamp))  
    note.date = new Date(timestamp);
  return note;
}
 
// Sends an email note to the recipient
// Returns 400 if recipient is not a valid email
// Returns 500 on email API error
// Returns 200 when successful
module.exports.send = (req, res) => {
  var note = parseNote(req);

  // Validate date
  if (req.body.date && !note.date) {
    res.status(400);
    res.send('Date is invalid.');
  // Validate to email
  } else if (!validator.validate(note.recipient)) {
    res.status(400);
    res.send('Email Address is invalid.');
  } else
    sendEmailNote(note, res)
}
