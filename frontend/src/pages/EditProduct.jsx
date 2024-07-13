import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditProduct.css';
const EditProduct = () => {
    const { productId } = useParams(); // Get productId from URL params
    const [product, setProduct] = useState({
        name: '',
        description: '',
        cost: 0
    });
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/v1/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/v1/products/${productId}`, product);
            setAlertMessage('Service edited successfully!');
            
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="EditProduct-container">
             <div className="EditProduct-formContainer">
                <h2>Edit Product</h2>
                {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} />
                     </div>
                    <div className="form-group">
                         <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange}></textarea>
                     </div>
                    <div className="form-group">
                         <label htmlFor="cost">Cost</label>
                        <input type="number" className="form-control" id="cost" name="cost" value={product.cost} onChange={handleChange} />
                    </div>
                     <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
