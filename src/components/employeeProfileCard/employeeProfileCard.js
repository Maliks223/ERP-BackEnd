import React, { useState } from "react";
import "./employeeProfileCard.css";
import EmployeeForm from "../employee-form/employee-form";
import { Button, Dialog } from "@mui/material";

const CardId = ({ data }) => {
  const [open, setopen] = useState(false);
  const { id, firstname, lastname, image, phonenumber, email, teams } = data;
  return (
    <>
      {/* <body class="bg-grid-line"></body> */}
      <div class="card">
        <Dialog open={open} onClose={() => setopen(!open)}>
          <EmployeeForm data={data} />
        </Dialog>

        <img
          id="thumb"
          src={`http://localhost:8000/storage/uploads/${image}`}
        />
        <Button
          className="addEmployeeBtn"
          variant="contained"
          sx={{
            margin:"16px",
            backgroundColor: "var(--blue)",
            minWidth: "8vw",
          }}
          onClick={() => setopen(!open)}
        >
          Edit Profile
        </Button>
        <h2 style={{ marginLeft: "15px" }}>
          {firstname} {`  `}
          {lastname}
        </h2>
        <div>
          <h3>Email: {email}</h3>
          <h3>Phone Number: {phonenumber}</h3>
          <h3>Team: {teams ? teams.name : "Not in a team"}</h3>
        </div>
      </div>
    </>
  );
};
export default CardId;
