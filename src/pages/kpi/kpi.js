import React, { useEffect, useState } from "react";
import "./kpi.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KPIRow from "../../components/kpis-card/kpis-card";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Dialog,
} from "@mui/material";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const KPIS = () => {
  const [name, setname] = useState([]);
  const [open, setclose] = useState(false);
  const [data, setData] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/kpi");
      const res = await response.json();
      console.table(res);
      setData(res);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const Postkpi = async () => {
    const data = new FormData();
    data.append("name", name);

    const res = await fetch("http://localhost:8000/api/kpi", {
      method: "POST",
      body: data,
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <div className="kpiContainer">
        <Button
          onClick={() => setclose(!open)}
          style={{
            position: "absolute",
            top: "2vh",
            right: "6vw",
            border: "1px solid transparent",
            backgroundColor: "#0A4F70",
            color: "white",
          }}
        >
          New Kpi
        </Button>
        {open && (
          <Dialog
            open={open}
            onClose={() => {
              setclose(!open);
            }}
          >
            <DialogTitle>Add New KPI</DialogTitle>
            <DialogContent>
              <form
                onSubmit={() => {
                  Postkpi();
                }}
              >
                <TextField
                  autoFocus
                  margin="dense"
                  name="Name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    type="submit"
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
                    Submit
                  </Button>
                  <Button
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
                    onClick={() => {
                      setclose(!open);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
        <h1 className="control">KPI's Control</h1>
        <TableContainer component={Paper}>
          <Table
            sx={{ margin: "auto", width: "85vw" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell className="tableTitle" align="center">
                  Id
                </StyledTableCell>
                <StyledTableCell className="tableTitle" align="center">
                  Kpi Name
                </StyledTableCell>
                {/* <StyledTableCell align="center">Description</StyledTableCell> */}
                <StyledTableCell className="tableTitle" align="center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((kpi, index) => (
                <KPIRow key={index} data={kpi} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default KPIS;
