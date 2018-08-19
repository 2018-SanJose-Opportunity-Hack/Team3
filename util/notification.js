var elasticemail = require('elasticemail');
var client = elasticemail.createClient({
  username: 'ksurajravin@vmware.com',
  apiKey: 'cd264303-a401-4a18-9950-8239efb9f552'
});



function sendEmail(emailText, toEmail, subject, callBack) {

  var msg = {
    from: 'ksurajravin@vmware.com',
    from_name: 'Suraj ',
    to: toEmail,
    subject,
    body_text: emailText
  };


  client.mailer.send(msg, function (err, result) {
    if (err) {
      return console.error(err);
    }

    console.log(result);
    callBack();
  });

}
module.exports = sendEmail;
