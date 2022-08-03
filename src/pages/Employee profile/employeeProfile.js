import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./employeeProfile.css";
import KPIAssignForm from "../../components/KPI_assign/KPI_assign_form";
import EditEmployeeTeam from "../../components/Edit_Employee_team/editEmployeeTeam";
import BarCharts from "../../components/LineGraph/LineGraph";
import CardId from "../../components/employeeProfileCard/employeeProfileCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RoleProject from "../../components/Role_Project/RoleProjectForm";
import KPICard from "../../components/KPI-card/kpiCard";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const EmployeeProfile = () => {
  const [open, setOpen] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const [employee, setEmployee] = useState();
  const [team, setTeam] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [latest, setLatest] = useState([]);
  const [roles, setRoles] = useState([]);

  const [activeAllKpis, setActiveAllKpis] = useState(true);
  const [activeLatestKpis, setActiveLatestKpis] = useState(false);
  const [activeRolesProjects, setActiveRolesProjects] = useState(false);

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
      const response = await fetch(
        `http://localhost:8000/api/employees/${data.id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }
      );
      const res = await response.json();
      setEmployee(res.data[0]);
      setTeam(res.data[0].teams);
      setFiltered(res.filtered);
      setLatest(res.latest_Kpi);
    } catch (err) {
      console.log("error", err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/employeerole/${data.id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }
      );
      const res = await response.json();
      setRoles(res.response);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchRoles();
  }, []);

  return (
    <>
      {employee && (
        <div className="employee-profile">
          <div className="flexprofile">
            <CardId data={employee} fetchEmployee={fetchEmployee} />
            <Button
              variant="contained"
              className="addEmployeeBtn"
              sx={{
                backgroundColor: "var(--blue)",
                minWidth: "8vw",
                position: "absolute",
                top: "77vh",
                left: "22.5vw",
              }}
              onClick={handleClickOpenTeam}
            >
              Change team
            </Button>
            <Dialog open={openTeam} onClose={handleCloseTeam}>
              <DialogTitle> Edit</DialogTitle>
              <DialogContent>
                <EditEmployeeTeam data={data} handleClose={handleCloseTeam} />
              </DialogContent>
            </Dialog>

            <Button
              variant="contained"
              className="addEmployeeBtn"
              onClick={handleClickOpen}
              sx={{
                width: "8vw",
                position: "absolute",
                left: "22.5vw",
                top: "83vh",
                backgroundColor: "#0A4f70",
              }}
            >
              assign KPI
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                sx={{ width: "maxContent", height: "10vh", margin: "auto" }}
              >
                {" "}
                Assign a KPI
              </DialogTitle>
              <DialogContent>
                <KPIAssignForm id={employee.id} handleClose={handleClose} fetchEmployee={fetchEmployee}/>
              </DialogContent>
            </Dialog>
          </div>
          {team && 
            <>
              <Button
                className="addEmployeeBtn"
                sx={{
                  position: "absolute",
                  left: "22.5vw",
                  top: "71vh",
                  backgroundColor: "var(--blue)",
                  color: "white",
                  width: "8vw",
                }}
                onClick={handleClickOpenRoles}
              >
                Assign Role
              </Button>
              <Dialog open={openRoles} onClose={handleCloseRoles}>
                <DialogTitle
                  sx={{ height: "10vh", width: "maxContent", margin: "auto" }}
                >
                  {" "}
                  Assign a Role in Project
                </DialogTitle>
                <DialogContent>
                  <RoleProject id={employee.id} team={employee.teams} fetchEmployee={fetchEmployee} handleClose={handleCloseRoles}/>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Button
            variant="contained"
            className="addEmployeeBtn"
            sx={{
              backgroundColor: "var(--blue)",
              minWidth: "8vw",
              position: "absolute",
              top: "22vh",
              left: "45vw",
            }}
            onClick={() => {
              setActiveLatestKpis(true);
              setActiveAllKpis(false);
              setActiveRolesProjects(false);
            }}
          >
            Latest Kpis
          </Button>
          <Button
            variant="contained"
            className="addEmployeeBtn"
            sx={{
              backgroundColor: "var(--blue)",
              minWidth: "8vw",
              position: "absolute",
              top: "22vh",
              left: "65vw",
            }}
            onClick={() => {
              setActiveLatestKpis(false);
              setActiveAllKpis(true);
              setActiveRolesProjects(false);
            }}
          >
            All Kpis
          </Button>
          <Button
            variant="contained"
            className="addEmployeeBtn"
            sx={{
              backgroundColor: "var(--blue)",
              minWidth: "8vw",
              position: "absolute",
              top: "22vh",
              left: "85vw",
            }}
            onClick={() => {
              setActiveLatestKpis(false);
              setActiveAllKpis(false);
              setActiveRolesProjects(true);
            }}
          >
            Roles in Projects
          </Button>


          <div className="roleProject">
            {activeLatestKpis && (
              <>
                <h1>Latest KPIs</h1>
                <ol className="late">
                  {latest &&
                    latest.map((kpi) => {
                      return (
                        <>
                          <li sx={{ margin: "50px", borderRadius: "10px" }}>
                            <KPICard title={kpi.kpi_name} rate={kpi.rate} />
                          </li>
                        </>
                      );
                    })}
                </ol>
              </>
            )}

            {activeAllKpis && (
              <>
                <Carousel
                  autoPlay={false}
                  infiniteLoop={false}
                  interval="3000"
                  transitionTime="1000"
                  swipeable={true}
                  showArrows={true}
                  showThumbs={true}
                  width={850}
                  dynamicHeight={100}
                  // emulateTouch={true}
                  className="hero-carousel"
                >
                  {filtered &&
                    filtered.map((list) => {
                      return <BarCharts kpis={list} />;
                    })}
                </Carousel>
              </>
            )}

            {activeRolesProjects && (
              <>
                Roles in Projects:
                {roles.map(role=>{
                  return <p>Role: {role.role_name}  Project:{role.project_name}</p>
                })}
              </>
            )}
          </div>
        </div>
      )
      }
    </>
  );
};

export default EmployeeProfile;
