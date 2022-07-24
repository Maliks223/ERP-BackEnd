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
import RoleProject from "../../components/Role_Project/RoleProjectForm";
import KPICard from "../../components/KPI-card/kpiCard";

// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
const EmployeeProfile = () => {
    const [open, setOpen] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [openRoles, setOpenRoles] = useState(false);
    const [employee, setEmployee] = useState();
    const [team, setTeam] = useState({});
    const [filtered, setFiltered] = useState([]);
    const [latest, setLatest] = useState([]);
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
            setTeam(res.data[0].teams)
            setFiltered(res.filtered);
            setLatest(res.latest_Kpi);
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
                    <div className="flexprofile">

                    <CardId data={employee} />
                    <Button
                    className="profile"
                    sx={{ 
                        // border: ".5px solid black",
                        backgroundColor: "#0A4f70",
                        // minHeight: "2vh",
                        // minWidth: "4vw",
                        color: "white"
                        ,position:'absolute',top:'67vh',left:'15.8vw'}} onClick={handleClickOpenTeam} >Edit Employee Team</Button>
                    <Dialog open={openTeam} onClose={handleCloseTeam}>
                        <DialogTitle> Edit</DialogTitle>
                        <DialogContent>
                            <EditEmployeeTeam data={data} />
                        </DialogContent>
                    </Dialog>

                    <Button className="profile" onClick={handleClickOpen} sx={{position:'absolute',left:'15.8vw',top:'73.2vh',backgroundColor:'#0A4f70',color:"white"}} >assign KPI</Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle> Assign a KPI</DialogTitle>
                        <DialogContent>
                            <KPIAssignForm id={employee.id} />
                        </DialogContent>
                    </Dialog>
                    
                    </div>
                    {team &&
                        <>
                            <Button className="profile"  sx={{position:'absolute',left:'15.8vw',top:'61vh',backgroundColor:'#0A4f70',color:"white"}} onClick={handleClickOpenRoles} >Assign a Role in Project</Button>
                            <Dialog open={openRoles} onClose={handleCloseRoles}>
                                <DialogTitle> Assign a Role in Project</DialogTitle>
                                <DialogContent>
                                    <RoleProject id={employee.id} team={employee.teams} />
                                </DialogContent>
                            </Dialog>
                        </>
                    }
                    <div className="combin">
                        <div className="scroly">
                        <h1 style={{position:'absolute',top:'12vh'}}>latest kpis</h1>

                                    <ol className="late">
                     {latest &&
                        latest.map(kpi => {
                            return <li sx={{margin:'50px'}}><KPICard title={kpi.kpi_name} rate={kpi.rate} /></li> 
                        })}
                                                </ol>
                                                </div>

                   
                <div className="car">
                    <h1 style={{position:'absolute',top:'42.5vh',left:'42.5vw'}}>All Kpis</h1>
                <Carousel autoPlay={true}infiniteLoop={true} interval="3000" transitionTime="1000"swipeable={true}showArrows={true}showThumbs={true}width={742} className="hero-carousel">


                



                   


                    {filtered &&
                        filtered.map((list) => {
                            return(
                      
                               <BarCharts kpis={list} />

                          
                            )
                        })}
                        </Carousel>
                        </div>
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