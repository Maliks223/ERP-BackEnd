import React from "react";
import "./team.css";
import { useState, useEffect } from "react";
import Team from "./teammodule";
import axios from "axios";
import { DialogContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button, Dialog } from "@mui/material";
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
import { Link } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Teams = () => {
  const [team, setteam] = useState([]);
  const [post, setpost] = useState(false);
  const [name, setname] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - team.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/teams", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    setteam(data);
  };

  const Post = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    try {
      const res = await axios
        .post("http://localhost:8000/api/teams", data, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        })
      Request();
      setpost(!post);
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    Request();
  }, []);

  return (
    <>
      <div className="teamContainer">
        <div className="teamcontainer">
          <h1 className="tableteams">Teams Control</h1>
          <Fab
            onClick={() => setpost(!post)}
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
          <>
            {post && (
              <Dialog open={post} onClose={() => setpost(!post)}>
                <DialogTitle>Add Team</DialogTitle>
                <form
                  onSubmit={(e) => Post(e)}
                  style={{
                    padding: "50px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    name="name"
                    id="name"
                    label="Team"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                  <div>
                    <Button
                      className="addEmployeeBtn"
                      sx={{
                        backgroundColor: "var(--blue)",
                        marginRight: "20px",
                        marginLeft: "10px",
                        marginTop: "36px",
                        width: "8vw",
                        color: "white",
                      }}
                      type="submit"
                    >
                      submit
                    </Button>
                    <Button
                      className="addEmployeeBtn"
                      onClick={() => setpost(!post)}
                      sx={{
                        backgroundColor: "var(--blue)",
                        marginRight: "20px",
                        marginLeft: "10px",
                        marginTop: "36px",
                        width: "8vw",
                        color: "white",
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Dialog>
            )}
            <TableContainer component={Paper}>
              <Table
                sx={{ margin: "auto", width: "85vw" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="tableTitle" align="center">
                      id
                    </StyledTableCell>
                    <StyledTableCell align="center" className="tableTitle">
                      Team
                    </StyledTableCell>
                    <StyledTableCell align="center" className="tableTitle">
                      Members
                    </StyledTableCell>
                    <StyledTableCell align="center" className="tableTitle">
                      Assigned Project
                    </StyledTableCell>
                    <StyledTableCell align="center" className="tableTitle">
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <div className="TeamContainer"> */}
                  {(rowsPerPage > 0
                    ? team.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : team
                  ).map((teamm, index) => {
                    return (
                      <Team
                        key={index}
                        fetchTeams={Request}
                        name={teamm.name}
                        id={teamm.id}
                        members={teamm.employees}
                        pivotId={teamm.projects}
                        project={teamm.projects.map((teammm, index) => {
                          return <div key={index}>{teammm.name}</div>;
                        })}
                      />
                    );
                  })}
                  {/* </div> */}
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={team.length}
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
          </>
        </div>
      </div>
    </>
  );
};
export default Teams;
