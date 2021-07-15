const noteBuilder = require('../builders/sermonNoteBuilder');
const sendgrid = require('../services/sendgrid.service');
var validator = require("email-validator");
 
module.exports.send = (req, res) => {
  var body = req.body;

  if (!validator.validate(body.recipient)) {
    res.status(400);
    res.send('bad request');
    return;
  }

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
}
