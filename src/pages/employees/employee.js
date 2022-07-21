import React, { useEffect, useState } from "react";
import "./employee.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmployeeRow from "../../components/employee-card/employeeCard";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import { Link } from "react-router-dom";

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
        className="pagintationBtn"
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        className="pagintationBtn"
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
        className="pagintationBtn"
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
        className="pagintationBtn"
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

const Employees = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [post, setpost] = useState(false);
  //post employee
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [image, setimage] = useState(null);
  const [team, setteam] = useState("");

  //get team
  const [getteam, setgetteam] = useState([]);
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

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/employees");
      const res = await response.json();
      console.log(res);
      setData(res);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  //teams
  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/teams")
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    setgetteam(data);
  };
  useEffect(() => {
    Request();
  }, []);

  return (
    <div className="employeeWraper">
      <div className="employee-page">
        <div className="postproject">
          <h1 className="projectsTitle">Employees Control</h1>
          <Button
            className="addEmployeeBtn"
            sx={{
              backgroundColor: "grey",
              border: ".5px solid black",
              backgroundColor: "#C6C4C4",
              marginTop: "130px",
              marginRight: "-32vw",
              maxHeight: "4vh",
              maxWidth: "10vw",
              color: "black",
            }}
          >
            Add Employee
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px" }}
                >
                  IMG
                </StyledTableCell>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px", borderLeft: "1px solid white" }}
                >
                  First Name
                </StyledTableCell>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px", borderLeft: "1px solid white" }}
                >
                  Last Name
                </StyledTableCell>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px", borderLeft: "1px solid white" }}
                >
                  Email
                </StyledTableCell>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px", borderLeft: "1px solid white" }}
                >
                  Team
                </StyledTableCell>
                <StyledTableCell
                  className="tableTitle"
                  align="center"
                  sx={{ fontSize: "22px", borderLeft: "1px solid white" }}
                >
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ Color: "black" }}>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((employee) => (
                <EmployeeRow data={employee} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
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
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default Employees;
