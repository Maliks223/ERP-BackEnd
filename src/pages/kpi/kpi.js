import React, { useEffect, useState } from "react";
import "./kpi.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KPIRow from "../../components/kpis-card/kpis-card";
import { DialogActions, DialogContent, DialogTitle,Button,TextField,Dialog } from "@mui/material";
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
const [name,setname]=useState([]);
const[open,setclose]=useState(false);
  const [data, setData] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/kpi');
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


  const Postkpi=async()=>{
  const data=new FormData();
  data.append("name",name);

    const res=await fetch("http://localhost:8000/api/kpi",{ method:"POST",body:data,})
    .catch((err)=>console.log(err));
  }


  return (
    <>
    <div className="kpiContainer">
    <Button onClick={()=>setclose(!open)} style={{position:'absolute',right:'5vw',top:'18.5vh',backgroundColor:'grey',color:'white'}}>New</Button>
   {open && <Dialog open={open}onClose={()=>{setclose(!open)}}>
      <DialogTitle>Add New KPI</DialogTitle>
      <DialogContent>
        <form  onSubmit={()=>{Postkpi()}}>
      <TextField
                    autoFocus
                    margin="dense"
                    name="Name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>{setname(e.target.value)}}
                />
                <DialogActions>
                  <Button type="submit">Submit</Button>
                  <Button style={{color:'red'}} onClick={()=>{setclose(!open)}}>Cancel</Button>

                </DialogActions>

</form>
      </DialogContent>
    </Dialog>
}
      <h1 className="control">KPI's Control</h1>
      <TableContainer component={Paper}>
        <Table sx={{ margin: "auto", width: '85vw' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Kpi Name</StyledTableCell>
              {/* <StyledTableCell align="center">Description</StyledTableCell> */}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((kpi,index) => (
              <KPIRow key={index} data={kpi} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  )
};
export default KPIS;