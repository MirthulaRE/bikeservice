const mongoose = require('mongoose');

const serviceRegistrationSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    emailid: { type: String, required: true },
    mobile: { type: String, required: true },
    model: { type: String, required: true },
    service: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    status: { type: String, required: true, default: 'pending' }  
}, { timestamps: true });

module.exports = mongoose.model('ServiceBooking', serviceRegistrationSchema);
