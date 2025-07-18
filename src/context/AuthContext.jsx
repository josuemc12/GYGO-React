
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(() => {
      return localStorage.getItem("userId") || null;
    });

  const [userGroup, setUserGroup] = useState(() => {
    return localStorage.getItem("userGroup") || null;
  });
  

  const login = (newRole,id,group) => {
    console.log("Guardando rol en contexto:", newRole); // <-- Debug
    setRole(newRole);
    setUserId(id);
    setUserGroup(group);

    localStorage.setItem("userRole", newRole); // Guarda rol
    localStorage.setItem("userId", id); // Guarda userId
    localStorage.setItem("userGroup", group); // Guarda userGroup
  };

  const logoutRol = () => {
    setRole(null);
    setUserId(null);
    setUserGroup(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userGroup");
  };

  return (
    <AuthContext.Provider value={{ role, userId, userGroup,login, logoutRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
