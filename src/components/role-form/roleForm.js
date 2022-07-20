import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const RoleForm = ({ data }) => {
  const { id } = data;

  const [inputs, setInputs] = useState({
    role: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", inputs.role);
    formData.append("description", inputs.description);

    formData.append("_method", "PUT");
    try {
      const response = await fetch(`http://localhost:8000/api/roles/${id}`, {
        method: "POST",
        content: "application/json",
        body: formData,
      })
        .then((response) => response.data)
        .then((result) => window.location.reload());
      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="role"
          label="Role"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />

        <TextField
          autoFocus
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleEdit}
          className="addEmployeeBtn"
          style={{
            backgroundColor: "grey",
            marginRight: "20px",
            marginLeft: "20px",
            marginTop: "30px",
            border: ".5px solid black",
            backgroundColor: "#C6C4C4",
            minHeight: "2vh",
            minWidth: "4vw",
            color: "black",
          }}
        >
          Edit
        </Button>
        {/* <Button onClick={}>Cancek</Button> */}
      </DialogActions>
    </>
  );
};

export default RoleForm;
