import React, { useEffect, useState } from "react";
import { Phone } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";
import EditEmployeeTeam from "../../components/Edit_Employee_team/editEmployeeTeam";

const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);

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

    const [employee, setEmployee] = useState([]);

    const fetchEmployee = async () => {
        const response = await fetch(`http://localhost:8000/api/employees/${data.id}`);
        console.log(response);
        const res = await response.json();
        console.log(res);
        setEmployee(res[0]);
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
                    <h3>KPIS: {employee.kpis.map(kpi => {
                        return (
                            <p>KPI name: {kpi.name} rate: {kpi.pivot.rate} date: {kpi.pivot.KPI_date}</p>
                        )
                    })}</h3>

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
                </div>}
        </>

    )
}


export default EmployeeProfile;