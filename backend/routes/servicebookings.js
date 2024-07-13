const express = require('express');
const router = express.Router();
const ServiceBooking = require('../models/serdata');
const sendEmail = require('../sendMail');

// GET /api/v1/servicebookings - Get all service bookings
router.get('/', async (req, res) => {
    try {
        const serviceBookings = await ServiceBooking.find();
        res.json(serviceBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/v1/servicebookings - Create a new service booking
router.post('/', async (req, res) => {
    const { fullname, emailid, mobile, model, service, bookingDate, status } = req.body;

    const serviceBooking = new ServiceBooking({
        fullname,
        emailid,
        mobile,
        model,
        service,
        bookingDate,
        status
    });

    try {
        const newServiceBooking = await serviceBooking.save();
        
        // Send email notification
        await sendEmail({
            fullname,
            emailid,
            mobile,
            model,
            service,
            bookingDate
        });

        res.status(201).json(newServiceBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/v1/servicebookings/:id - Update service booking status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const updatedBooking = await ServiceBooking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBooking) {
            return res.status(404).send('Booking not found');
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
