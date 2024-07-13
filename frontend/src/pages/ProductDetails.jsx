import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './ProductDetails.css';

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (productId) => {
        
        window.location.href = `/edit-product/${productId}`;
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/products/${productId}`);
            setAlertMessage('Service deleted successfully');
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-details">
            <h1>Service Details</h1>
            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-3" key={product._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Cost: {product.cost}</p>
                                <div>
                                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(product._id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
