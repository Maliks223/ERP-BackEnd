import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./navbar.css";



export default function NavBar() {

  const id = localStorage.getItem("id");
  const [user, setuser] = useState([]);

  const fetchAdmin = async () => {
    const res = await fetch(`http://localhost:8000/api/getAdmin/${id}`);
    const response = await res.json();
    setuser(response);
  }

  useEffect(() => {
    fetchAdmin();
  }, [])

  return (
    <div className="navbarContainer">
      <img
        className="user-image"
        src={`http://localhost:8000/storage/uploads/${user.profile_image}`}
        alt={user.name}
      />
      <input className="searchinput" type="text" placeholder="Search" />
      <div className="logotext">
        <img className="rotate" src={require('./malek.png')} />
        <img className="taz" src={require('./tazkarje.png')} />
      </div>
    </div>
  );
}