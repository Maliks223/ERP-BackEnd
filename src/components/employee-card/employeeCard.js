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
import EmployeeForm from "../employee-form/employee-form";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import './employeeCard.css';

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

const EmployeeRow = ({ data  }) => {
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

  const { id, firstname, lastname, email, team_id, image ,teams} = data;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/employees/${id}`,
        {
          method: "Delete",
          content: "application/json",
        }
      );
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
          alt={firstname}
          src={`http://localhost:8000/storage/uploads/${image}`}
        />
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {firstname}
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {lastname}
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {email}
      </StyledTableCell>
      <StyledTableCell
        className="tableInfo"
        align="center"
        sx={{ color: "black" }}
      >
        {team_id ? teams.name : "Not in a Team"}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button onClick={handleClickOpen}>
          <EditIcon sx={{ transform: "scale(1.5)" }} color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <EmployeeForm data={data} />
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon sx={{ transform: "scale(1.5)" }} color="error" />
        </Button>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this Employee?
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
        <Button
        variant="contained"
          className="addEmployeeBtn"
          style={{
            backgroundColor: "var(--blue)",
            marginLeft: "20px",
            textDecoration: "none",
            minWidth: "8vw",
            color: "white",
          }}
        >
          <Link style = {{color:"white", textDecoration:"none"}} to={`/employees/id=${id}`} state={{ data: data }}>
            View More
          </Link>
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EmployeeRow;
