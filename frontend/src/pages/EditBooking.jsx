import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get(`https://bikeservice-1.onrender.com/api/v1/servicebookings/${id}`)
            .then(response => {
                setBooking(response.data);
                setStatus(response.data.status);
            })
            .catch(error => {
                console.error('Error fetching booking:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://bikeservice-1.onrender.com/api/v1/servicebookings/${id}`, { ...booking, status })
            .then(response => {
                navigate('/service-bookings');
            })
            .catch(error => {
                console.error('Error updating booking:', error);
            });
    };

    if (!booking) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Booking</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={booking.fullname} disabled />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={booking.emailid} disabled />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" value={booking.mobile} disabled />
                </div>
                <div>
                    <label>Model:</label>
                    <input type="text" value={booking.model} disabled />
                </div>
                <div>
                    <label>Service:</label>
                    <input type="text" value={booking.service} disabled />
                </div>
                <div>
                    <label>Booking Date:</label>
                    <input type="text" value={new Date(booking.bookingDate).toLocaleDateString()} disabled />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="ready for delivery">Ready for Delivery</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EditBooking;
