import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PreviousBookings.css';

const PreviousBookings = () => {
    const [previousBookings, setPreviousBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with the actual endpoint to fetch previous bookings
        axios.get('https://bikeservice-1.onrender.com/previous-bookings')
            .then(response => {
                setPreviousBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading previous bookings.</div>;

    return (
        <div className="previous-bookings-container">
            <h2>Previous Bookings</h2>
            {previousBookings.length > 0 ? (
                previousBookings.map((booking, index) => (
                    <div key={index} className="booking-item">
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Service: {booking.service}</p>
                    </div>
                ))
            ) : (
                <p>No bookings done.</p>
            )}
        </div>
    );
};

export default PreviousBookings;
