import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (

    <nav className="navbar navbar-expand-lg p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="ms-auto">
          <a href=" ">
            <img src="logo.png" alt="Logo" style={{ height: '40px' }} />
          </a>
        </div>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">????????????</a>
            </li>



            <li className="nav-item">
              <a className="nav-link active" href="#">????????????</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="">????????????</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="">?????????????</a>
            </li>


            <li className="nav-item">
              <a className="nav-link" href="#"></a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
