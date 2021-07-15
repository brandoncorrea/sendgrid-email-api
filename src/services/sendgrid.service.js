const sendgrid = require('@sendgrid/mail');
const settings = require('../appSettings.json');
sendgrid.setApiKey(settings.SendGrid.ApiKey);

exports.sendMail = (to, from, subject, html) => sendgrid
  .send({ to, from, subject, html });