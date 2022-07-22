import React, { useEffect, useState } from "react";
import { Phone } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";
import EditEmployeeTeam from "../../components/Edit_Employee_team/editEmployeeTeam";
import BarCharts from "../../components/LineGraph/LineGraph";
import CardId from "../../components/employeeProfileCard/employeeProfileCard";
import RoleProject from "../../components/Role_Project/RoleProjectForm";

const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [openRoles, setOpenRoles] = useState(false);
    const [employee, setEmployee] = useState();
    const [filtered, setFiltered] = useState([]);
    const [roles, setRoles] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenTeam = () => {
        setOpenTeam(true);
    };

    const handleCloseTeam = () => {
        setOpenTeam(false);
    };

    const handleClickOpenRoles = () => {
        setOpenRoles(true);
    };

    const handleCloseRoles = () => {
        setOpenRoles(false);
    };

    const location = useLocation();
    const data = location.state?.data;



    const fetchEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/employees/${data.id}`);
            const res = await response.json();
            setEmployee(res.data[0]);
            setFiltered(res.filtered);
        }
        catch (err) {
            console.log('error', err);
        }
    }

    const fetchRoles = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/employeerole/${data.id}`);
            const res = await response.json();
            setRoles(res);
        }
        catch (err) {
            console.log('error', err);
        }
    }

    useEffect(() => {
        fetchEmployee();
        fetchRoles();
    }, []);


    return (
        <>

            {employee &&
                <div className="employee-profile">
                    <CardId data={employee} />
                    <Button onClick={handleClickOpenTeam} >Edit Employee Team</Button>
                    <Dialog open={openTeam} onClose={handleCloseTeam}>
                        <DialogTitle> Edit</DialogTitle>
                        <DialogContent>
                            <EditEmployeeTeam data={data} />
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleClickOpen} >assign KPI</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle> Assign a KPI</DialogTitle>
                        <DialogContent>
                            <KPIAssignForm id={employee.id} />
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleClickOpenRoles} >Assign a Role in Project</Button>
                    <Dialog open={openRoles} onClose={handleCloseRoles}>
                        <DialogTitle> Assign a Role in Project</DialogTitle>
                        <DialogContent>
                            <RoleProject id={employee.id}/>
                        </DialogContent>
                    </Dialog>

                    {filtered &&
                        filtered.map(list => {
                            return <BarCharts kpis={list} />
                        })}

                </div>}
        </>

    )
}


export default EmployeeProfile;