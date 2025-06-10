import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7217/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log(data);

    if (!data.isSuccess) {
      setError(data.errors ? data.errors.join(", ") : "Login failed");
      return;
    }

    if (data.is2FactorRequired) {
      localStorage.setItem("tempToken", data.tempToken);
      alert("Two-factor authentication required. Please verify.");
      return;
    }

    if (data.token) {
      localStorage.setItem("authToken", data.token.accessToken);
      alert("Login successful!");

      // falta redirect a la pagina de dashboard

    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (err) {
    setError(err.message);
  }};

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
        <p>
          Forgot password? | New here?{" "}
          <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;