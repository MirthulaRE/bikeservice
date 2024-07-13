import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Home = () => {
    const { setUserEmail } = useContext(UserContext);
    const navigate = useNavigate();

    const handleViewBookingStatus = () => {
        setUserEmail('kg@gmail.com'); 
        navigate('/booking-status'); 
    };
    
    return (
        <div className="home-container">
            <div className="content-container">
                <h1>Bike Service</h1>
                <p>
                    Welcome to our bike service center! We're here to ensure that your two-wheeled companion
                    receives the care and attention it deserves. Whether you're in need of a routine check-up,
                    repairs, or a complete overhaul, our team of experienced technicians is ready to provide
                    top-notch service.
                </p>
                <h3>Available Services</h3>
                <div className="services-container">
                    <div className="service">
                        <h2>General Service</h2>
                        <p>Keep your bike running smoothly with our comprehensive general service.</p>
                        <p><strong>Cost:</strong> ₹1500</p>
                    </div>
                    <div className="service">
                        <h2>Oil Change</h2>
                        <p>Ensure optimal engine performance with our professional oil change service.</p>
                        <p><strong>Cost:</strong> ₹200 - ₹500</p>
                    </div>
                    <div className="service">
                        <h2>Water Wash</h2>
                        <p>Restore your bike's shine with our thorough water wash service.</p>
                        <p><strong>Cost:</strong> ₹300</p>
                    </div>
                </div>
                <Link to="/firststep" className="btn btn-primary" style={{ marginBottom: '20px' }}>
                    Book Your Service Now
                </Link>
                <div className="buttons-container">
                    <button onClick={handleViewBookingStatus} className="btn btn-secondary">
                        View Booking Status
                    </button>
                    <Link to="/previous-bookings" className="btn btn-secondary">
                        View Previous Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
