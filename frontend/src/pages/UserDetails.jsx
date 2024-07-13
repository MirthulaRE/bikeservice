import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://bikeservice-1.onrender.com/api/v1/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className="user-details">
            <h1>User Details</h1>
            <div className="row">
                {users.map(user => (
                    <div className="col-md-4 mb-3" key={user._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">Email: {user.email}</p>
                                <p className="card-text">Role: {user.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDetails;
