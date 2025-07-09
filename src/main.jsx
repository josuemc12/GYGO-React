import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext";
import { MaterialUIControllerProvider } from "./context/index.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
    </BrowserRouter>
  </StrictMode>
);
