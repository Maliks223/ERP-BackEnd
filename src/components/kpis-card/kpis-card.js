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
import KPIForm from "../kpi-form/kpiForm";
import EmployeeAssignForm from "../KPI_assign/Employee_assign_form";

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

const KPIRow = ({ data }) => {
  const [openassign, setopenassign] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);



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

  const { id, name, employees } = data;

  const getemployees = async () => {
    return (
      <div>
        {employees.map((emplo, i) => {
          return (
            <h4 key={i}>
              {emplo.firstname} {emplo.lastname}
            </h4>
          );
        })}
      </div>
    );
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/kpi/${id}`, {
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
        {id}
      </StyledTableCell>
      {/* <StyledTableCell align="center">{firstname}</StyledTableCell> */}
      <StyledTableCell align="center">{name}</StyledTableCell>
      <StyledTableCell align="center">
        {employees.length !== 0 ? (
          <div>
            {" "}
            {employees.map((emplo, i) => {
              return (
                <h4 key={i}>
                  {emplo.firstname} {emplo.lastname}
                </h4>
              );
            })}
          </div>
        ) : (
          "Not Assigned Yet"
        )}
      </StyledTableCell>

      <StyledTableCell align="center">
        <Button onClick={handleClickOpen}>
          <EditIcon color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <KPIForm data={data} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon color="error" />
        </Button>
        <Button
          onClick={() => {
            setopenassign(!openassign);
          }}
          className="addEmployeeBtn"
          variant="contained"
          style={{
            marginRight: "20px",
            marginLeft: "20px",
            backgroundColor: "var(--blue)",
            minWidth: "8vw",
          }}
        >
          assign to employee
        </Button>
        <Dialog open={openassign} onClose={() => setopenassign(!openassign)}>
          <EmployeeAssignForm data={data}  />
        </Dialog>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this KpI?
          </DialogContent>
          <DialogActions>
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

export default KPIRow;
