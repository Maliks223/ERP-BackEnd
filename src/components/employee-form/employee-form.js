import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FileUploader from "../File_uploader/fileUploader";

const EmployeeForm = ({ data }) => {
  const { id } = data;

  const [image, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
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
    formData.append("firstname", inputs.firstname);
    formData.append("lastname", inputs.lastname);
    formData.append("email", inputs.email);
    formData.append("phonenumber", inputs.phonenumber);
    formData.append("image", image);
    formData.append("_method", "PUT");
    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${id}`,
        {
          method: "POST",
          content: "application/json",
          body: formData,
        }
      );
      const res = await response.json();
      console.log(res);
    } catch {
      return "err";
    }
  };

  return (
    <>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstname"
          label="First Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="lastname"
          label="Last Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="phonenumber"
          label="Phone Number"
          type="tel"
          fullWidth
          variant="standard"
          onChange={handleChange}
          sx={{ marginBottom: "24px" }}
        />
        <FileUploader onFileSelect={(file) => setFile(file)} />
      </DialogContent>
      <DialogActions>
        <Button
          className="addEmployeeBtn"
          variant="contained"
          sx={{
            backgroundColor: "var(--blue)",
            minWidth: "8vw",
            margin:"auto",
            marginBottom:"16px"
          }}
          onClick={handleEdit}
        >
          Confirm Edit
        </Button>
        {/* <Button onClick={handleClose}>Cancek</Button> */}
      </DialogActions>
    </>
  );
};

export default EmployeeForm;
