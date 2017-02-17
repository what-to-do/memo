'use strict';

// nodemailer is an npm package allowing node to send email
// through a SMTP server.  this is configured to use the 
// snippets2017@gmail.com account for emailing a user
// their requested snippet from the email modal
const nodemailer = require('nodemailer');

// nodemailer is configured here to be called using a recipient, a title,
// and a body of an email
module.exports = function(recipient, title, body , user) {
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'snippets2017@gmail.com',
		pass: 'snippets1'
	}
});

// setup email data with unicode symbols
let mailOptions = {
	from: '"Snippets" <snippets2017@gmail.com>', 	// sender address
	to: recipient, 	// list of receivers
	subject: "You have recieved a snippet from " + user, 	// subject line
	text: body, 	// text body
	html: body	// html body
};

console.log(mailOptions);

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message %s sent: %s', info.messageId, info.response);
});

}