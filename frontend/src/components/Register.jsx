import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // State for admin registration
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/register', { name, email, password, isAdmin })
            .then(result => {
                console.log(result);
                if (result.data === "Already registered") {
                    alert("E-mail already registered! Please Login to proceed.");
                    navigate('/login');
                } else {
                    alert("Registered successfully!");
                    if (isAdmin) {
                        navigate('/dashboard'); 
                    } else {
                        navigate('/login'); 
                    }
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h1 className="register-heading text-dark">Register For Bike Service!!</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label" style={{ color: 'black' }}>
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            id="exampleInputName"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail" className="form-label" style={{ color: 'black' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="exampleInputEmail"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'black' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            id="exampleInputPassword"
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="adminCheckbox"
                            checked={isAdmin}
                            onChange={(event) => setIsAdmin(event.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="adminCheckbox" style={{ color: 'black' }}>
                            Register as Admin
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <h5 className="already-text-dark-dark">Already have an account?</h5>
                <Link to='/login' className="btn btn-secondary">Login</Link>
            </div>
        </div>
    )
}

export default Register;
