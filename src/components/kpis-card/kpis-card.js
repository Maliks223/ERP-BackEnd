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
  const[openassign,setopenassign]=useState(false);
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

  const { id, name } = data;

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
        <Button onClick={handleClickOpen}>
          <EditIcon color="success" />
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <KPIForm data={data} />
          </DialogContent>
        </Dialog>
        <Button onClick={handleClickOpenDelete}>
          <DeleteIcon color="error" />
        </Button>
        <Button onClick={()=>{setopenassign(!openassign)}}
         className="addEmployeeBtn"
         style={{
           backgroundColor: "grey",
           marginRight: "20px",
           marginLeft: "20px",
          

           border: ".5px solid black",
           backgroundColor: "#C6C4C4",
           minHeight: "2vh",
           minWidth: "4vw",
           color: "black",
         }}>
          assign to employee
                  </Button>
                  <Dialog open={openassign}onClose={()=>setopenassign(!openassign)}>
                    <EmployeeAssignForm id={id} />
                  </Dialog>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this KpI?
          </DialogContent>
          <DialogActions>
            <Button
              className="addEmployeeBtn"
              onClick={handleDelete}
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
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default KPIRow;
