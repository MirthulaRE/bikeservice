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

    const validateFullName = (name) => /^[A-Za-z\s]+$/.test(name);
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validateMobile = (number) => /^[0-9]{10}$/.test(number);
    const validateModel = (model) => /^(?:[A-Za-z]+[0-9]*|[A-Za-z0-9]+)$/.test(model);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateFullName(fullname)) {
            alert("Full Name should only contain letters and spaces.");
            return;
        }

        if (!validateEmail(emailid)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validateMobile(mobile)) {
            alert("Mobile number should contain exactly 10 digits.");
            return;
        }

        if (!validateModel(model)) {
            alert("Bike Model should contain either only letters or a combination of letters and numbers.");
            return;
        }

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

    const today = new Date().toISOString().split('T')[0]; 

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
                            min={today} 
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
