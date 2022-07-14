import { Phone } from "@mui/icons-material";
import React from "react";
import { useLocation } from "react-router-dom";
import './employeeProfile.css';

const EmployeeProfile = () => {

    const location = useLocation();
    const data = location.state?.data;
    const { id, firstname, lastname, email,phonenumber, teams, image,kpis } = data;
    return (
        <>
            <div className="employee-profile">
                <img className='profile-image' src={`http://localhost:8000/storage/uploads/${image}`} />
                <h3>{firstname} {`  ` }{lastname}</h3>
                <h3>Email: {email}</h3>
                <h3>Phone Number: {phonenumber}</h3>
                <h3>Team: {teams.name}</h3>
                <h3>KPIS: {kpis.map(kpi=>{
                    return(
                        <h4>KPI name: {kpi.name} rate: {kpi.pivot.rate} date: {kpi.pivot.KPI_date}</h4>
                    )
                })}</h3>
            </div>
        </>

    )
}


export default EmployeeProfile;