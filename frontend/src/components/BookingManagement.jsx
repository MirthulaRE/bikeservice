import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings from backend on component mount
        axios.get('https://bikeservice-1.onrender.com/bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleReadyForDelivery = (bookingId) => {
        axios.put(`https://bikeservice-1.onrender.com/bookings/${bookingId}/ready`)
            .then(response => {
                console.log('Booking marked as ready for delivery:', response.data);
                // Update bookings state after marking as ready for delivery
                setBookings(bookings.map(booking => (
                    booking._id === bookingId ? { ...booking, status: 'ready' } : booking
                )));
            })
            .catch(error => console.error('Error marking booking as ready for delivery:', error));
    };

    const handleCompleted = (bookingId) => {
        axios.put(`https://bikeservice-1.onrender.com/bookings/${bookingId}/completed`)
            .then(response => {
                console.log('Booking marked as completed:', response.data);
                // Update bookings state after marking as completed
                setBookings(bookings.map(booking => (
                    booking._id === bookingId ? { ...booking, status: 'completed' } : booking
                )));
            })
            .catch(error => console.error('Error marking booking as completed:', error));
    };

    return (
        <div>
            <h2>Booking Management</h2>
            <ul>
                {bookings.map(booking => (
                    <li key={booking._id}>
                        <div>{booking.customerName} - {booking.serviceName} - {booking.status}</div>
                        <button onClick={() => handleReadyForDelivery(booking._id)}>Mark Ready for Delivery</button>
                        <button onClick={() => handleCompleted(booking._id)}>Mark Completed</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingManagement;
