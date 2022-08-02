import React, { useState } from "react";
import "./employeeProfileCard.css";
import { Button, Dialog } from "@mui/material";
import EmployeeProfileForm from "../employee-form/employee-profile-form";

const CardId = ({ data, fetchEmployee }) => {
  const [open, setopen] = useState(false);

  const handleCloseEdit = () => {
    setopen(false)
  }
  const { id, firstname, lastname, image, phonenumber, email, teams } = data;
  return (
    <>
      {/* <body class="bg-grid-line"></body> */}
      <div class="card">
        <Dialog open={open} onClose={handleCloseEdit}>
          <EmployeeProfileForm data={data} handleCloseEdit={handleCloseEdit} fetchEmployee={fetchEmployee} />
        </Dialog>

        <img
          alt="employee-profile"
          id="thumb"
          src={`http://localhost:8000/storage/uploads/${image}`}
        />
        <Button
          className="addEmployeeBtn"
          variant="contained"
          sx={{
            margin: "16px",
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
