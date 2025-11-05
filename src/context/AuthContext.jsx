import { createContext, useContext, useState, useEffect } from "react";
import { refreshLogin } from "../API/Auth";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [userGroup, setUserGroup] = useState(() => localStorage.getItem("userGroup") || null); // ← AGREGAR
  const [hasPaidGroupAdminAccess, setHasPaidGroupAdminAccess] = useState(false);
  
  const navigate = useNavigate(); 



  const login = (newRole, id, groupId = null) => { // ← Agregar groupId opcional
    
    setRole(newRole);
    setUserId(id);
    setUserGroup(groupId); // ← AGREGAR
    localStorage.setItem("userRole", newRole);
    localStorage.setItem("userId", id);
    if (groupId) {
      localStorage.setItem("userGroup", groupId); // ← AGREGAR
    }
  };

  const logoutRol = () => {
    setRole(null);
    setUserId(null);
    setUserGroup(null); // ← AGREGAR
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userGroup"); // ← AGREGAR
     localStorage.clear();    
  };

  const refreshUserData = async () => {
    try {
      const data = await refreshLogin();
      console.log("Datos recibidos del refresh:", data); // ← Para debug
      
      if (data?.user?.role && data?.user?.id) {
        setRole(data.user.role);
        setUserId(data.user.id);
        setUserGroup(data.user.groupId); // ← Ahora sí existe
        
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userId", data.user.id);
        
        if (data.user.groupId) { // ← Solo guardar si existe
          localStorage.setItem("userGroup", data.user.groupId);
        }
        
        return true; // ← Indicar éxito
      } else {
        console.error("No se pudo refrescar el usuario:", data);
        return false; // ← Indicar fallo
      }
    } catch (error) {
      console.error("Error al refrescar el login:", error);
      return false; // ← Indicar fallo
    }
  };

  const markUserAsPaid = () => {
    setHasPaidGroupAdminAccess(true);
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        userId,
        userGroup, // ← AGREGAR
        hasPaidGroupAdminAccess,
        login,
        logoutRol,
        refreshUserData,
        markUserAsPaid,
        updateRole
            }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};