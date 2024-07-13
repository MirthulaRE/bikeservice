import React from 'react';
import axios from 'axios';

const DeleteService = ({ serviceId }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://bikeservice-1.onrender.com/api/v1/products/${serviceId}`);
            console.log('Service deleted:', response.data);
           
        } catch (error) {
            console.error('Error deleting service:', error);
        }
        
    };

    return (
        <div>
            <h1>Delete Service</h1>
            <button onClick={handleDelete}>Delete Service</button>
        </div>
    );
};

export default DeleteService;
