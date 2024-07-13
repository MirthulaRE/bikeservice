
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');
    const [bookingData, setBookingData] = useState(null);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, bookingData, setBookingData }}>
            {children}
        </UserContext.Provider>
    );
};
