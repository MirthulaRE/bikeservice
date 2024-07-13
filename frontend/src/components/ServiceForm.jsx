import React, { useState, useEffect } from 'react';

const ServiceForm = ({ onSubmit, editingService, onUpdateService }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (editingService) {
            setName(editingService.name);
            setDescription(editingService.description);
            setPrice(editingService.price);
        }
    }, [editingService]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const service = { name, description, price };

        if (editingService) {
            onUpdateService(editingService._id, service);
        } else {
            onSubmit(service);
        }

        setName('');
        setDescription('');
        setPrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">
                {editingService ? 'Update Service' : 'Create Service'}
            </button>
        </form>
    );
};

export default ServiceForm;
