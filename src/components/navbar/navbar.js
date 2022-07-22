import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
 import "./navbar.css";
export default function NavBar() {

    const admin = localStorage.getItem("admin");
    const json = JSON.parse(admin);
    console.log("json", json);
    const [user, setuser] = useState(json);

   return (
    <div className="navbarContainer">
 <img
                                className="user-image"
                                src={`http://localhost:8000/storage/uploads/${user.profile_image}`}
                                alt={user.name}
                            />
                            <input className="searchinput" type="text" placeholder="Search"/>
                            <div className="logotext">
              <img className="rotate"src={require('./malek.png')}/> 
              <img className="taz" src={require('./tazkarje.png')}/>
                </div>
    </div>
   );
}