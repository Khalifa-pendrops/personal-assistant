import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-primary">
      <h1 className=" w-50 text-center">
        WELCOME TO YOUR AI-POWERED PERSONAL ASSISTANT 👽
      </h1>
      <Link to="/dashboard">
        <button className="px-4 py-1 btn border">Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;
