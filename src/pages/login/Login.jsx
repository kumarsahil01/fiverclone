import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res=axios.post("http://localhost:8000/api/auth/login",{
        username,password
       },{withCredentials:true});
      localStorage.setItem("currentUser",JSON.stringify((await res).data)) 
      navigate('/')
    } catch (err) {
     setError(err)
     console.log(err)
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;