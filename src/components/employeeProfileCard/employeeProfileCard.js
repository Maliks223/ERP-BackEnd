import React, { useState } from "react";
import './employeeProfileCard.css'
import EmployeeForm from "../employee-form/employee-form";
import { Button, Dialog } from "@mui/material";

const CardId = ({ data }) => {
    const[open,setopen]=useState(false);
    const { id, firstname, lastname, image, phonenumber, email, teams } = data;
    return (
        <>
    
            {/* <body class="bg-grid-line"></body> */}
            <div class="card">
            <Button
        className="addEmployeeBtn"
        sx={{
          backgroundColor: "black",
          minHeight: "4vh",
          minWidth: "10vw",
          fontWeight: "600",
          color: "white",
          marginBottom: "24px",
        }}
        onClick={()=>setopen(!open)}>
Edit Profile
        </Button>
        <Dialog open={open}onClose={()=>setopen(!open)}>
        <EmployeeForm data={data}/>
        </Dialog>
                
                    <img id="thumb"  src={`http://localhost:8000/storage/uploads/${image}`} />
                    <h2 style={{marginLeft:'15px'}}>{firstname} {`  `}{lastname}</h2>
                    <div>
                    <h3>Email: {email}</h3>
                    <h3>Phone Number: {phonenumber}</h3>
                    <h3>Team: {teams? teams.name : "no team"}</h3>
                    </div>
                    {/* <div class="area">
                    </div> */}
            </div>
        </>
    )
}
export default CardId;