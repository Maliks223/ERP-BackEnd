// import { Details } from '@material-ui/icons';
import React, { useState } from "react";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    console.log(email, password);

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
    console.log(result);
    localStorage.setItem("token", JSON.stringify(result.token));
    localStorage.setItem("admin", JSON.stringify(result.admin));
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
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
            type="email"
            id="outlined-required"
            label="Email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
            type="password"
            id="outlined-required"
            label="Password"
          />
          <Button className="loginBtn" onClick={login} variant="outlined">
            Login
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Login;
