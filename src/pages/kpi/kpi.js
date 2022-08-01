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
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Dialog,
} from "@mui/material";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/kpi", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Postkpi = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);

    const res = await fetch("http://localhost:8000/api/kpi", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: data,
    })
      .then(() => fetchEmployees())
      .then(() => setclose(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="kpiContainer">
        <Fab
          onClick={() => setclose(!open)}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            top: "13vh",
            right: "6vw",
            backgroundColor: "var(--blue)",
          }}
        >
          <AddIcon />
        </Fab>

        {open && (
          <Dialog
            open={open}
            onClose={() => {
              setclose(!open);
            }}
          >
            <DialogTitle sx={{ margin: "auto" }}>Add New KPI</DialogTitle>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  Postkpi(e);
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
                    variant="contained"
                    className="addEmployeeBtn"
                    type="submit"
                    style={{
                      marginRight: "20px",
                      marginLeft: "20px",
                      marginTop: "30px",
                      backgroundColor: "var(--blue)",
                      minWidth: "8vw",
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    className="addEmployeeBtn"
                    style={{
                      marginRight: "20px",
                      marginLeft: "20px",
                      marginTop: "30px",
                      backgroundColor: "var(--blue)",
                      minWidth: "8vw",
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
        <h1
          className="control"
          style={{ marginTop: "10vh", marginLeft: "4vw" }}
        >
          KPI's Control
        </h1>
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
                {/* <StyledTableCell className="tableTitle" align="center">
                  Assigned to
                </StyledTableCell> */}
                {/* <StyledTableCell align="center">Description</StyledTableCell> */}
                <StyledTableCell className="tableTitle" align="center">
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                : data
              ).map((kpi, index) => (
                <KPIRow key={index} data={kpi} fetchEmployees={fetchEmployees} />
              ))}
            </TableBody>
            <TableBody>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={2}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
              <TableFooter></TableFooter>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default KPIS;
