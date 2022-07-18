import React, { useState } from "react";
import { Phone } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";

const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const location = useLocation();
    const data = location.state?.data;
    const { id, firstname, lastname, email, phonenumber, teams, image, kpis } = data;

    const assignKPI = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="employee-profile">
                <img className='profile-image' src={`http://localhost:8000/storage/uploads/${image}`} />
                <h3>{firstname} {`  `}{lastname}</h3>
                <h3>Email: {email}</h3>
                <h3>Phone Number: {phonenumber}</h3>
                <h3>Team: {teams.name}</h3>
                <h3>KPIS: {kpis.map(kpi => {
                    return (
                        <p>KPI name: {kpi.name} rate: {kpi.pivot.rate} date: {kpi.pivot.KPI_date}</p>
                    )
                })}</h3>
                <Button onClick={handleClickOpen} >assign KPI</Button>
                {/* onClick={assignKPI} */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle> Assign a KPI</DialogTitle>
                    <DialogContent>
                        <KPIAssignForm />
                    </DialogContent>
                </Dialog>
            </div>
        </>

    )
}


export default EmployeeProfile;