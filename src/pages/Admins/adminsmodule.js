import React from "react";
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

const AdminRow = ({ data }) => {
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

  const { profile_image, name, email, id } = data;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: "Delete",
        content: "application/json",
      });
      const res = await response.json();
      console.log(res);
    } catch {
      return "error ya kaptin";
    }
  };
  return (
    <StyledTableRow key={id}>
      <StyledTableCell component="th" scope="row" align="center">
        <Avatar
          alt={name}
          src={`http://localhost:8000/storage/uploads/${profile_image}`}
        />
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {name}
      </StyledTableCell>

      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {email}
      </StyledTableCell>

      <StyledTableCell align="center">
        <Button onClick={handleClickOpen}>
          <EditIcon sx={{ transform: "scale(1.5)" }} color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            {/* <EmployeeForm data={data} /> */}
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon sx={{ transform: "scale(1.5)" }} color="error" />
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
              className="addEmployeeBtn"
              sx={{
                marginTop: "24px",
                backgroundColor: "#C6C4C4",
                minHeight: "3vh",
                minWidth: "6vw",
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.614)",
                marginBottom: "24px",
              }}
              onClick={handleDelete}
              color="error"
            >
              Yes
            </Button>
            <Button
              className="addEmployeeBtn"
              sx={{
                marginTop: "24px",
                backgroundColor: "#C6C4C4",
                minHeight: "3vh",
                minWidth: "6vw",
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.614)",
                marginBottom: "24px",
              }}
              onClick={handleCloseDelete}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
       
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AdminRow;
