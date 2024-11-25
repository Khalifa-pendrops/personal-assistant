import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function UserLogin() {
  const [userData, setUserData] = useState({
    // name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { userData }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-primary">
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column justify-content-center align-items-center gap-4 w-100 py-5 container-sm"
      >
        <h2>Login</h2>
        <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
          {/* <input
            className="form-control w-50 ps-3 py-2 bg-info text-light rounded"
            type="text"
            name="name"
            value={userData.name}
            id="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          /> */}

          <input
            className="form-control w-50 ps-3 py-2 bg-info text-light rounded"
            type="email"
            name="email"
            value={userData.email}
            id="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            className="form-control w-50 ps-3 py-2 bg-info text-light rounded"
            type="password"
            name="password"
            value={userData.password}
            id="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        {error && <p className="text-danger">{error}!</p>}
        <p>
          No account? Click{" "}
          <Link to="/signup" className="text-success">
            here
          </Link>{" "}
          to join.
        </p>
        <button type="submit" className="px-5 py-1 btn border">
          Login
        </button>
      </form>
      <button
        type="submit"
        onClick={handleGoogleLogin}
        className="px-5 py-1 btn border"
      >
        Login with Google
      </button>
    </div>
  );
}

export default UserLogin;
