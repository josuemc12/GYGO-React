import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || null;
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });


  const login = (role,id) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserId(id);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", id);
  };

  
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole,userId,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);