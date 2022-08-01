import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FileUploader from "../File_uploader/fileUploader";

const AdminEdit = ({ data }) => {
    const { id, name, email } = data;

    const [image, setFile] = useState(null);
    const [inputs, setInputs] = useState({
        firstname: "",
        email: ""
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = async (e) => {
        const formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("email", inputs.email);
        formData.append("profile_image", image);
        formData.append("_method", "PUT");
        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${id}`,
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
            window.location.reload();
        } catch {
            return "err";
        }
    };

    return (
        <>
            <DialogContent>
                <TextField
                    defaultValue={name}
                    autoFocus
                    margin="dense"
                    name="name"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    defaultValue={email}
                    autoFocus
                    margin="dense"
                    name="emai"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <FileUploader onFileSelect={(file) => setFile(file)} />
            </DialogContent>
            <DialogActions>
                <Button
                    className="addEmployeeBtn"
                    sx={{
                        backgroundColor: "#C6C4C4",
                        minHeight: "4vh",
                        minWidth: "10vw",
                        fontWeight: "600",
                        color: "rgba(0, 0, 0, 0.614)",
                        marginBottom: "24px",
                    }}
                    onClick={handleEdit}
                >
                    Confirm Edit
                </Button>
            </DialogActions>
        </>
    )
};
export default AdminEdit;