import React, { useEffect, useState } from "react";
import "./Admin.css";

import Axios from "axios";
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
// import { Link } from "react-router-dom";
import AdminRow from "./adminsmodule";

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

const Admin = (props) => {
  const [admins, setAdmins] = useState([]);
  const [postname, setpostname] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [post, setPost] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admins.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Request = async () => {
    const res = await Axios.get("http://localhost:8000/api/users").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setAdmins(data));
  }, []);

  const handlePost = async () => {
    const data = new FormData();
    data.append("name", postname);

    await Axios.post("http://localhost:8000/api/project", data).catch((err) =>
      console.log(err)
    );
  };

  return (
    <div className="projectsWrapper">
      <div className="projectcontainer">
        <>
          <div className="postproject">
            <h1 className="projectsTitle">Admins Control</h1>
            <Button
            className="addEmployeeBtn"
            style={{
              backgroundColor: "grey",
              border: ".5px solid black",
              backgroundColor: "#C6C4C4",
              marginTop:"130px",
              marginRight:"48px",
              maxHeight: "4vh",
              maxWidth: "10vw",
              color: "black",
            }}
            id="icons"
            onClick={() => {
              setPost(!post);
            }}
          >
            Create new project
          </Button>
          </div>

          {post && (
            <Dialog
              open={post}
              onClose={() => {
                setPost(!post);
              }}
            >
              <DialogTitle style={{ marginBottom: "40px" }}>
                Create Project
              </DialogTitle>

              <DialogContent>
                <form
                  onSubmit={(e) => {
                    handlePost();
                  }}
                >
                  <TextField
                    name="name"
                    placeholder="projectName"
                    //   onFocus={true}
                    type="text"
                    onChange={(e) => {
                      setpostname(e.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    style={{ marginTop: "80px", marginRight: "20px" }}
                  >
                    submit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <TableContainer component={Paper}>
            <Table
              sx={{ margin: "auto", width: "80vw" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className="tableTitle" align="center">
                    IMG
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Name
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Email
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? admins.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : admins
                ).map((admin, index) => {
                  return (
                  <AdminRow key={index} data={admin} />
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={admins.length}
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
      
        </>
      </div>
    </div>
  );
};
export default Admin;
