import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if(result.data === "Success") {
                    console.log("Login Success");
                    alert('Login successful!');
                    navigate('/home');
                } else {
                    alert('Incorrect password! Please try again.');
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h2 className="login-heading text-dark">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <h1 className='login-info-text text-dark'>Don't have an account?</h1>
                <Link to='/register' className="btn btn-secondary">Register</Link>
            </div>
        </div>
    )
}

export default Login;
