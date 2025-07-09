import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  

  const login = (newRole,id) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
    setId(id);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{id, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);