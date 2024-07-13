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
            from: '"mirthulare.21it@kongu.edu', // sender address
            to: 'BikeBuddy Services" bikebuddy@gmail.com ', // list of receivers
            subject: 'New Service Booking', // Subject line
            html: `
                <h3>New Service Booking Details:</h3>
                <ul>
                    <li><strong>Name:</strong> ${bookingDetails.fullname}</li>
                    <li><strong>Email:</strong> ${bookingDetails.emailid}</li>
                    <li><strong>Mobile:</strong> ${bookingDetails.mobile}</li>
                    <li><strong>Model:</strong> ${bookingDetails.model}</li>
                    <li><strong>Service:</strong> ${bookingDetails.service}</li>
                    <li><strong>Booking Date:</strong> ${new Date(bookingDetails.bookingDate).toLocaleDateString()}</li>
                </ul>
            `
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
