
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  

  const login = (newRole) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
    localStorage.setItem("userRole", newRole); // Guarda rol
  };

  const logoutRol = () => {
    setRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ role, login, logoutRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
