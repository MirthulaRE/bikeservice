import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ServiceBookings.css';

const ServiceBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get('https://bikeservice-1.onrender.com/api/v1/servicebookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching service bookings:', error);
            });
    }, []);

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setStatus(booking.status);
    };

    const handleSave = (id) => {
        axios.put(`https://bikeservice-1.onrender.com/api/v1/servicebookings/${id}`, { status })
            .then(response => {
                setBookings(bookings.map(booking => booking._id === id ? { ...booking, status } : booking));
                setEditingBooking(null);
                alert("Service Booking edited successfully");
            })
            .catch(error => {
                console.error('Error updating booking:', error);
            });
    };

    return (
        <div className="service-bookings">
            <h1>Booking Details</h1>
            <div className="row">
                {bookings.map(booking => (
                    <div className="col-md-4 mb-3" key={booking._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Name: {booking.fullname}</h5>
                                <p className="card-text">Email: {booking.emailid}</p>
                                <p className="card-text">Mobile: {booking.mobile}</p>
                                <p className="card-text">Model: {booking.model}</p>
                                <p className="card-text">Service: {booking.service}</p>
                                <p className="card-text">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                {editingBooking && editingBooking._id === booking._id ? (
                                    <div>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="ready for delivery">Ready for Delivery</option>
                                            <option value="completed">Completed</option>
                                        </select><br></br>
                                        <button className="btn btn-success ml-2" onClick={() => handleSave(booking._id)}>Save</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => setEditingBooking(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="card-text">Status: {booking.status}</p>
                                        <button className="btn btn-primary mr-2" onClick={() => handleEdit(booking)}>Edit Status</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceBookings;
