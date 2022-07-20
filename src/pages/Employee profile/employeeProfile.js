import React, { useEffect, useState } from "react";
import { Phone } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";
import EditEmployeeTeam from "../../components/Edit_Employee_team/editEmployeeTeam";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import LineGraph from "../../components/LineGraph/LineGraph";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [employee, setEmployee] = useState();


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

    const location = useLocation();
    const data = location.state?.data;



    const fetchEmployee = async () => {
        const response = await fetch(`http://localhost:8000/api/employees/${data.id}`);
        const res = await response.json();
        setEmployee(res[0]);
        console.log(res[0]);
    }

    useEffect(() => {
        fetchEmployee();
    }, []);


    return (
        <>
            {employee &&
                <div className="employee-profile">

                    <img className='profile-image' src={`http://localhost:8000/storage/uploads/${employee.image}`} />
                    <h3>{employee.firstname} {`  `}{employee.lastname}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Phone Number: {employee.phonenumber}</h3>
                    <h3>Team: {employee.teams.name}</h3>

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

                    <LineGraph kpis={employee.kpis} />

                    {/* <Button onClick={handleClickOpenTeam} >Assign a Role in Project</Button>
                    <Dialog open={openTeam} onClose={handleCloseTeam}>
                        <DialogTitle> Edit</DialogTitle>
                        <DialogContent>
                            <EditEmployeeTeam data={data} />
                        </DialogContent>
                    </Dialog> */}
                </div>}
        </>

    )
}


export default EmployeeProfile;