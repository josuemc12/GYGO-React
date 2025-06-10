import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { ProjectsPage } from "./Pages/ProjectsPage";
import  Login  from "./Pages/Login";
import SignInButton from "./components/LoginButton";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <NavBar />
  );
}

export default App;
