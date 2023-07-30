// UserContext.js

import { createContext, useState } from "react";

// Create a UserContext to store the user information
export const UserContext = createContext();

// Create a UserProvider component to wrap around the App component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
