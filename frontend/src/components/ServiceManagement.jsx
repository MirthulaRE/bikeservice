import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
       
        axios.get('https://bikeservice-1.onrender.com/service registrations')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleDelete = (serviceId) => {
        axios.delete(`https://bikeservice-1.onrender.com/service registrations/${serviceId}`)
            .then(response => {
                console.log('Service deleted:', response.data);
                
                setServices(services.filter(service => service._id !== serviceId));
            })
            .catch(error => console.error('Error deleting service:', error));
    };

    return (
        <div>
            <h2>Service Management</h2>
            <ul>
                {services.map(service => (
                    <li key={service._id}>
                        <div>{service.name}</div>
                        <button onClick={() => handleDelete(service._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceManagement;
