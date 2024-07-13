import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext'; 
import Home from './Home';
import Login from './Login';
import Register from './Register';
import FirstStep from './Firststep';
import BookingStatus from './BookingStatus';
import PreviousBookings from './PreviousBookings';
import Dashboard from './Db';
import ProductDetails from '../pages/ProductDetails';
import CreateService from '../pages/CreateService'; 
import EditProduct from '../pages/EditProduct';
import DeleteService from '../pages/DeleteService';
import UserDetails from '../pages/UserDetails';
import ServiceBookings from '../pages/ServiceBookings';
import EditBooking from '../pages/EditBooking';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/firststep" element={<FirstStep />} />
          <Route path="/booking-status" element={<BookingStatus />} />
          <Route path="/previous-bookings" element={<PreviousBookings />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/productdetails" element={<ProductDetails/>} />
          <Route path="/userdetails" element={<UserDetails/>} />
          <Route path="/ServiceBookings" element={<ServiceBookings />} />
          <Route path="/createservice" element={<CreateService/>} />
          <Route exact path="/edit-product/:productId" element={<EditProduct/>} />
          <Route path="/deleteservice" element={<DeleteService/>} />
          <Route path="/editbooking" element={<EditBooking />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
