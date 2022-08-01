import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RoleRow from "../../components/role-card/roleCard";
import "./role.css";
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
  Dialog,
  Button,
  DialogContent,
  TextField,
  DialogTitle,
  Icon,
} from "@mui/material";
import axios from "axios";
import { AddCircle, ControlPoint } from "@mui/icons-material";

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

const Roles = () => {
  const [data, setData] = useState([]);
  const [opendialog, setopendialog] = useState(false);
  const [role, setrole] = useState([]);
  const [description, setdescription] = useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/roles", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      const res = await response.json();
      console.log(res);
      setData(res);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchRoles();
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
  const PostRole = async () => {
    const data = new FormData();
    data.append("role", role);
    data.append("description", description);

    const res = await axios
      .post("http://localhost:8000/api/roles", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }, data)

      .catch((err) => console.log(err));
  };

  return (
    <>
      <Fab
        className="addIconWrapper"
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          top: "13vh",
          right: "6vw",
          backgroundColor: "var(--blue)",
        }}
        onClick={() => {
          setopendialog(!opendialog);
        }}
      >
        <AddIcon className="addIcon" />
      </Fab>
      <AddCircle style={{ fontSize: "50px" }} />
      {opendialog && (
        <Dialog open={opendialog} onClose={() => setopendialog(!opendialog)}>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogContent>
            <form
              onSubmit={() => {
                PostRole();
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                name="role"
                label="Role"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setrole(e.target.value);
                }}
              />

              <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
              <DialogActions>
                <Button
                  className="addEmployeeBtn"
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--blue)",
                    marginTop: "16px",
                    marginRight: "24px",
                    width: "4.5vw",
                  }}
                >
                  Post
                </Button>

                <Button
                  className="addEmployeeBtn"
                  variant="contained"
                  sx={{ backgroundColor: "var(--blue)", marginTop: "16px" }}
                  onClick={() => setopendialog(false)}
                >
                  cancel
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <div className="rolecontainer">
        <h1 style={{ marginLeft: "2vw", marginBottom: "36px" }}>
          Roles Control
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ width: "85vw" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="tableTitle" align="center">
                  Role
                </StyledTableCell>
                <StyledTableCell className="tableTitle" align="center">
                  Description
                </StyledTableCell>
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
              ).map((employee, index) => (
                <RoleRow key={index} data={employee} />
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

export default Roles;
