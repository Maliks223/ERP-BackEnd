import React, { useEffect, useState } from "react";
import { Phone } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";
import EditEmployeeTeam from "../../components/Edit_Employee_team/editEmployeeTeam";
import BarCharts from "../../components/LineGraph/LineGraph";
import CardId from "../../components/employeeProfileCard/employeeProfileCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [employee, setEmployee] = useState();
    const [filtered, setFiltered] = useState([]);


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
        setEmployee(res.data[0]);
        setFiltered(res.filtered);
        console.log(res);
    }

    useEffect(() => {
        fetchEmployee();
    }, []);


    return (
        <>
            {employee &&
                <div className="employee-profile">
                    <div className="flexprofile">

                    <CardId data={employee} />
                    <Button
                    className="addEmployeeBtn"
                    style={{ 
                        border: ".5px solid black",
                        backgroundColor: "#C6C4C4",
                        minHeight: "2vh",
                        minWidth: "4vw",
                        color: "black"
                        ,position:'absolute',top:'62vh',right:'12.5vw'}} onClick={handleClickOpenTeam} >Edit Employee Team</Button>
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
                    
                    </div>
                   
                <div className="car">
                <Carousel autoPlay={true}infiniteLoop={true} interval="3000" transitionTime="1000"swipeable={true}showArrows={true}showThumbs={true} className="hero-carousel">
                    {filtered &&
                        filtered.map((list) => {
                            return(
                      
                               <BarCharts kpis={list} />

                          
                            )
                        })}
                        </Carousel>
                        </div>
                                                                             

                       
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