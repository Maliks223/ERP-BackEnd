import React, { useState } from "react";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    // e.preventDefault();
    try {
      let item = { email, password };
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      result = await result.json();
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("id", JSON.stringify(result.admin.id));
      navigate('/');
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="loginContainer">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="loginContainerform">
          <h2>Please enter your email and password.</h2>
          <TextField
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            type="email"
            id="standard-basic"
            label="Email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            type="password"
            id="standard-basic"
            variant="standard"
            label="Password"
          />
          <Button className="loginBtn" onClick={login} variant="outlined">
            Login
          </Button>
        </div>
      </Box>
      <div className="footer">Codi B08 Group 2 ©</div>
    </div>
  );
};

export default Login;
