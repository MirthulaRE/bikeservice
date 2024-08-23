const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (bookingDetails) => {
    try {
        // Create a Nodemailer transporter using SMTP
        let transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            to: '"mirthulare.21it@kongu.edu', // sender address
            from: 'BikeBuddy Services" bikebuddy@gmail.com ', // list of receivers
            subject:  'Your Bike is Ready for Delivery',
            text: `Hello Arjun, your bike service is complete and your bike is ready for delivery.
            `
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
