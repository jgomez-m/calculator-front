import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the context provider component
export const UserProvider = ({ children }) => {
  const [userName, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
