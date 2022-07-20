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
import RoleForm from "../role-form/roleForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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

const RoleRow = ({ data }) => {
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

  const { id, role, description } = data;

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/roles/${id}`, {
        method: "Delete",
        content: "application/json",
      })
        .then((response) => response.data)
        .then((result) => window.location.reload());
      const res = await response.json();
      console.log(res);
    } catch {
      return "error ya kaptin";
    }
  };
  return (
    <StyledTableRow key={id}>
      <StyledTableCell component="th" scope="row" align="center">
        {role}
      </StyledTableCell>
      <StyledTableCell align="center">{description}</StyledTableCell>

      <StyledTableCell align="center">
        <Button onClick={handleClickOpen}>
          <EditIcon color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <RoleForm data={data} />
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon color="error" />
        </Button>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this Role?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDelete}
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
              Yes
            </Button>
            <Button
              className="addEmployeeBtn"
              onClick={handleCloseDelete}
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
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Button>Assign to Employee</Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RoleRow;
