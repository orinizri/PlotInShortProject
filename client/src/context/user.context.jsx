import React, { useContext } from 'react';
import { createContext, useState } from "react";


const UserContext = React.createContext(null);

export const UserState = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )

};