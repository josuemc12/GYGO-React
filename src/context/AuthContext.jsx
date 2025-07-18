
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(() => {
      return localStorage.getItem("userId") || null;
    });
  

  const login = (newRole,id) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
    setUserId(id);
    localStorage.setItem("userRole", newRole); // Guarda rol
    localStorage.setItem("userId", id); // Guarda userId
  };

  const logoutRol = () => {
    setRole(null);
    setUserId(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ role, userId,login, logoutRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
