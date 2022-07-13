import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmployeeRow from "../../components/employee-card/employeeCard";
import RoleRow from "../../components/role-card/roleCard";

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

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/roles');
            const res = await response.json();
            console.log(res);
            setData(res);
        }
        catch {
            console.log('error');
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <>
            <h2>roles</h2>
            <TableContainer component={Paper}>
                <Table sx={{ marginLeft: '15vw', width: '80vw' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Role</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((employee) => (
                            <RoleRow data={employee} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Roles;