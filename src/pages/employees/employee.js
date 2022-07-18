import React, { useEffect, useState } from "react";
import "./employee.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmployeeRow from "../../components/employee-card/employeeCard";
import { Button, Dialog, DialogContent, DialogTitle, Select, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Link } from "react-router-dom";
import axios from "axios";
import FileUploader from "../../components/File_uploader/fileUploader";

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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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
  const[post,setpost]=useState(false);
  //post employee
  const[firstname,setfirstname]=useState("");
  const[lastname,setlastname]=useState("");
  const[email,setemail]=useState("");
  const[phonenumber,setphonenumber]=useState("");
  const[image,setimage]=useState(null);
  const[team,setteam]=useState("");

  //get team
const[getteam,setgetteam]=useState([])
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

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("phonenumber", phonenumber);
    data.append("image", image);
    data.append("team_id", team);
try{
    await fetch
     (`http://localhost:8000/api/employees`,{method:'POST',body:data,content:"application/json" })
}
catch(err){
     console.log(err);
}
  };


  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/employees');
      const res = await response.json();
      console.table(res);
      setData(res);
    }
    catch {
      console.log('error');
    }
  }

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
    <>
    <div className="emplo">
      <Link to="/home">
    <Button className="back"style={{color:'black',margin: '10px', border: '1px solid black',
    backgroundColor: 'grey'}}>Back</Button></Link>
          <Link to="/teams">
    <Button className="back"style={{color:'black',margin: '10px', border: '1px solid black',
    backgroundColor: 'grey'}}>  Teams</Button></Link>
    </div>
    <div className="employee-page">
      <h1>employees</h1>
      <Button onClick={()=>{setpost(!post)}}>
        Add Employee
      </Button>
      <Dialog open={post}onClose={(e)=>setpost(!post)}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
        <form className="formm"onSubmit={(e)=>{handleSubmit()}}>
          <TextField    
                    autoFocus
                    margin="dense"
                    name='first name'
                    label="First Name"
                    type="text"
                    fullwidth
                    variant="standard"onChange={(e)=>{setfirstname(e.target.value)}}/>
          <TextField   
                    autoFocus
                    margin="dense"
                    name='last name'
                    label="Last Name"
                    type="text"
                    fullwidth
                    variant="standard"onChange={(e)=>{setlastname(e.target.value)}}/>
          <TextField   
                    autoFocus
                    margin="dense"
                    name='email'
                    label="Email"
                    type="email"
                    fullwidth
                    variant="standard"
                    onChange={(e)=>{setemail(e.target.value)}}/>
          <TextField    
                    autoFocus
                    margin="dense"
                    name='phone number'
                    label="Phone Number"
                    type="number"
                    fullwidth
                    variant="standard"
                    onChange={(e)=>{setphonenumber(e.target.value)}}/>
          {/* <TextField name="image"type="file"placeholder="image"onChange={(e)=>{setimage(e.target.files[0])}}/> */}


          {/* <h3>Choose A Team</h3> */}
          <select
          autoFocus
          margin="dense"
          name='team'
          label="Selet A TEam"
          type="select"
          fullwidth
          variant="standard"
                  onChange={(e)=>{setteam(e.target.value)}}
                  style={{ padding: "3px 3px 10px 3px", margin: "11px" }}
                >
                  <option>Teams</option>
                  {getteam &&
                    getteam.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
                <FileUploader style={{marginLeft:'30px'}}onFileSelect={(file) => setimage(file)} />

          <Button type="submit">submit</Button>
        </form>
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Team</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data).map((employee,index) => (
                  <EmployeeRow key={index} data={employee} />
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
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
    </>
  )
};
export default Employees;
