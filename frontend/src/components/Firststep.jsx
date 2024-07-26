import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Firststep.css';

const FirstStep = () => {
    const [fullname, setFullName] = useState('');
    const [emailid, setEmailid] = useState('');
    const [mobile, setMobile] = useState('');
    const [model, setModel] = useState('');
    const [service, setService] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const { setUserEmail, setBookingData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const bookingDetails = { fullname, emailid, mobile, model, service, bookingDate };
        axios.post('http://localhost:3001/firststep', bookingDetails)
            .then(result => {
                if (result.data === "Already registered") {
                    alert("You are already registered");
                } else {
                    alert("Registered successfully! Get ready for top-notch service!");
                }
                setUserEmail(emailid);
                setBookingData(bookingDetails);
                navigate('/booking-status');
            })
            .catch(err => console.log(err));
    }

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return (
        <div className="firststep-container">
            <div className="firststep-form-container">
                <h2 className="firststep-heading">Your Bike Deserves the Best Care!</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputName" className="form-label firststep-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            className="form-control firststep-input"
                            id="exampleInputName"
                            onChange={(event) => setFullName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail" className="form-label firststep-label">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control firststep-input"
                            id="exampleInputEmail"
                            onChange={(event) => setEmailid(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputMobile" className="form-label firststep-label">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            className="form-control firststep-input"
                            id="exampleInputMobile"
                            onChange={(event) => setMobile(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputModel" className="form-label firststep-label">
                            Bike Model
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Model"
                            className="form-control firststep-input"
                            id="exampleInputModel"
                            onChange={(event) => setModel(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputService" className="form-label firststep-label">
                            Service Required
                        </label>
                        <select
                            className="form-control firststep-input"
                            id="exampleInputService"
                            value={service}
                            onChange={(event) => setService(event.target.value)}
                            required
                        >
                            <option value="" disabled>Select Service</option>
                            <option value="General service check-up">General service check-up</option>
                            <option value="Oil change">Oil change</option>
                            <option value="Water wash">Water wash</option>
                        </select>
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputDate" className="form-label firststep-label">
                            Booking Date
                        </label>
                        <input
                            type="date"
                            placeholder="Select Date"
                            className="form-control firststep-input"
                            id="exampleInputDate"
                            min={today} // Set the minimum date to today
                            onChange={(event) => setBookingDate(event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn firststep-btn">Register Now!</button>
                </form>
            </div>
        </div>
    );
}

export default FirstStep;
