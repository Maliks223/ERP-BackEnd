import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import FileUploader from "../../components/File_uploader/fileUploader";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Admin = ({ id, email, name, image, fetchAdmins }) => {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [names, setname] = useState("");
  const [emails, setemail] = useState("");
  const [file, setFile] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "Delete",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        content: "application/json",
      });
      fetchAdmins();
      handleCloseDelete();
      const res = await response.json();
      console.log(res);
    } catch {
      return "error ya kaptin";
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", names);
    data.append("email", emails);
    data.append("profile_image", file);
    data.append("_method", "PUT");

    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "POST",
        content: "application/json",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: data,
      });
      fetchAdmins();
      handleClose();
      const res = await response.json();
      console.log(res);

    } catch {
      return "err";
    }
  };
  return (
    <StyledTableRow key={id}>
      <StyledTableCell component="th" scope="row" align="center">
        <Avatar
          alt={name}
          src={`http://localhost:8000/storage/uploads/${image}`}
        />
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black", fontSize: "18px!important" }}
      >
        {name}
      </StyledTableCell>

      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black", fontSize: "18px!important" }}
      >
        {email}
      </StyledTableCell>

      <StyledTableCell align="center">
        <Button onClick={handleClickOpen}>
          <EditIcon color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleEdit}
            >
              <TextField
                style={{ marginTop: "20px", marginBottom: "20px" }}
                name="name"
                placeholder="name"
                label="name"
                defaultValue={name}
                //   onFocus={true}
                type="text"
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <TextField
                name="name"
                defaultValue={email}
                placeholder="email"
                label="email"
                //   onFocus={true}
                type="text"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <FileUploader onFileSelect={(file) => setFile(file)} />
              <DialogActions>
                <Button
                  type="submit"
                  className="addEmployeeBtn"
                  style={{
                    backgroundColor: "var(--blue)",
                    marginRight: "90px",
                    marginTop: "36px",
                    width: "8vw",
                  }}
                  variant="contained"
                >
                  Submit
                </Button>
                <Button
                  className="addEmployeeBtn"
                  style={{
                    backgroundColor: "var(--blue)",
                    marginRight: "90px",
                    marginTop: "36px",
                    width: "8vw",
                  }}
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon color="error" />
        </Button>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this Admin?
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              onClick={handleDelete}
              color="error"
              className="addEmployeeBtnY"
              variant="contained"
              style={{
                backgroundColor: "grey",
                marginRight: "30px",
                marginBottom: "30px",
                marginLeft: "15px",
                backgroundColor: "red",
                minWidth: "8vw",
                transition: "0.1s ease-in-out",
              }}
            >
              Yes
            </Button>
            <Button
              onClick={handleCloseDelete}
              variant="contained"
              className="addEmployeeBtn"
              style={{
                backgroundColor: "var(--blue)",
                marginBottom: "30px",
                marginRight: "15px",
                minWidth: "8vw",
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default Admin;
