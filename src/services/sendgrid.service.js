const sendgrid = require('@sendgrid/mail');
const settings = require('../appSettings.json');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = (to, subject, html) => sendgrid
  .send({ 
    to: to, 
    from: settings.SendGrid.From, 
    subject: subject, 
    html: html
  });