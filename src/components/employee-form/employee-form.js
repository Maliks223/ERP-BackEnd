import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FileUploader from "../File_uploader/fileUploader";
import NotificationBar from "../notificationBar/notificationBar";

const EmployeeForm = ({ data, handleClose, fetchEmployees }) => {
  const { id } = data;
  const [note, setNote] = useState(false);
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

  const handleEdit = async () => {
    // e.preventDefault();
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
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: formData,
        }
      );
      const res = await response.json();
      console.log(res);
      fetchEmployees();
      handleClose();
      console.log(note);
      setNote(true);
      // handleClose();
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
  }, [note]);

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
            // margin: "auto",
            marginRight: "106px",
            marginBottom: "16px",
          }}
          onClick={() => {
            handleEdit();
            setNote(true)
          }}
        >
          Confirm Edit
        </Button>
        <Button
          variant="contained"
          className="addEmployeeBtn"
          sx={{
            marginRight: "16px",
            backgroundColor: "var(--blue)",
            minWidth: "8vw",
            marginBottom: "17px",
          }}
          onClick={() => {
            handleClose();
          }
          }
        >
          Close
        </Button>
        {note && <NotificationBar note={note} message={"Employee data is updated"} />}
        {/* <Button onClick={handleClose}>Cancek</Button> */}
      </DialogActions>
    </>
  );
};

export default EmployeeForm;
