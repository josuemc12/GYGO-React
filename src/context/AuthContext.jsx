import { createContext, useContext, useState } from "react";
import { refreshLogin } from "../API/Auth"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [userGroup, setUserGroup] = useState(() => localStorage.getItem("userGroup") || null);
  const [hasPaidGroupAdminAccess, setHasPaidGroupAdminAccess] = useState(false);

  const login = (newRole, id, grupo) => {
    setRole(newRole);
    setUserId(id);
    setUserGroup(grupo);
    localStorage.setItem("userGroup", grupo);
    localStorage.setItem("userRole", newRole);
    localStorage.setItem("userId", id);
  };

  const logoutRol = () => {
    setRole(null);
    setUserId(null);
    setUserGroup(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("userGroup");
    localStorage.removeItem("userId");
  };

  const refreshUserData = async () => {
  try {
    const data = await refreshLogin();
    if (data?.user?.role && data?.user?.id) {
      setRole(data.user.role);
      setUserId(data.user.id);
      setUserGroup(data.user.groupId); 
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userGroup", data.user.groupId);
    } else {
      console.error("No se pudo refrescar el usuario:", data);
    }
  } catch (error) {
    console.error("Error al refrescar el login:", error);
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
        hasPaidGroupAdminAccess,
        userGroup,
        login,
        logoutRol,
        refreshUserData,
        markUserAsPaid,
        updateRole,
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
