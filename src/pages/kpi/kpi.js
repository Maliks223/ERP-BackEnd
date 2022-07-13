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


  return (
    <>
      <h1>kpis</h1>
      <TableContainer component={Paper}>
        <Table sx={{ marginLeft: '15vw', width: '80vw' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Kpi Name</StyledTableCell>
              {/* <StyledTableCell align="center">Description</StyledTableCell> */}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((kpi) => (
              <KPIRow data={kpi} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};
export default KPIS;