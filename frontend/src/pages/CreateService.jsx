import React, { useState } from 'react';
import axios from 'axios';
import '../pages/CreateService.css';

const CreateService = () => {
    const [serviceId, setServiceId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://bikeservice-1.onrender.com/api/v1/products', {
                serviceId,
                name,
                description,
                cost
            });
            console.log('Service created:', response.data);
            // Optionally, redirect or update state to reflect the creation

            // Show alert message upon successful creation
            window.alert('A New Bike Service Successfully Created');

            // Clear form fields after successful creation
            setServiceId('');
            setName('');
            setDescription('');
            setCost('');
        } catch (error) {
            console.error('Error creating service:', error);
            // Optionally handle error states or display error messages
        }
    };

    return (
        <div className="create-service-container">
            <h1>Create New Bike Service</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service ID:</label>
                    <input type="text" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Cost:</label>
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
                </div>
                <br />
                <button type="submit">Create Service</button>
            </form>
        </div>
    );
};

export default CreateService;
