import React, { useEffect, useState } from "react";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // I need to validate if the token is a valid
    if (token) {
      navigate('/')
    }
  }, [])

  async function login(e) {
    // e.preventDefault();
    setGeneralError('');
    setEmailError('');
    setPassword('');
    try {
      setLoading(true);
      let item = { email, password };
      let result = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });
      console.log(result);
      result = await result.json();
      console.log(result);
      if (result.errors) {
        if (result.errors.email) {
          setEmailError(result.errors.email[0])
        }
        if (result.errors.password) {
          setPasswordError(result.errors.password[0])

        }
        return;
      }
      if (result.success === false) {
        setGeneralError(result.message)
        return;
      }
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("id", JSON.stringify(result.admin.id));
      navigate('/');
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="loginContainer">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        // noValidate
        autoComplete="off"
      >
        <div className="loginContainerform">
          {loading &&
            <CircularProgress />

          }
          {generalError &&
            <Alert severity="error" sx={{ height: "40px", transform: "scale(1.3)" }}>{generalError}</Alert>
          }
          <h2>Please enter your email and password.</h2>
          <TextField
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError("");
              setGeneralError("")
            }}
            className="input"
            required
            type="email"
            id="standard-basic"
            label="Email"
            error={emailError !== ""}
            helperText={emailError}
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError("");
              setGeneralError("")
            }}
            value={password}
            className="input"
            required
            type="password"
            id="standard-basic"
            variant="standard"
            label="Password"
            error={passwordError !== ""}
            helperText={passwordError}
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
