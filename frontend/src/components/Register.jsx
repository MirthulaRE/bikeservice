import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // State for admin registration
    const [errors, setErrors] = useState({}); // State to handle errors
    const navigate = useNavigate();

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            return "Name can only contain alphabets.";
        }
        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{3}$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address that must have @ followed by .";
        }
        return "";
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must contain at least one letter and one number, and be at least 6 characters long.";
        }
        return "";
    };

    const validate = () => {
        const errors = {};

        const nameError = validateName(name);
        if (nameError) errors.name = nameError;

        const emailError = validateEmail(email);
        if (emailError) errors.email = emailError;

        const passwordError = validatePassword(password);
        if (passwordError) errors.password = passwordError;

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
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
    };

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
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setErrors({ ...errors, name: validateName(event.target.value) });
                            }}
                            required
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
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
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setErrors({ ...errors, email: validateEmail(event.target.value) });
                            }}
                            required
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
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
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors({ ...errors, password: validatePassword(event.target.value) });
                            }}
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
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
    );
};

export default Register;
