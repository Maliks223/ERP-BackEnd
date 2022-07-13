import React from "react";
import { useLocation } from "react-router-dom";


const EmployeeProfile = () => {

    const location = useLocation();
    const data = location.state?.data;
    const { id, firstname, lastname, email, team_id, image } = data;
    return (
        <>
            <h2>{firstname}</h2>
            <h1 style={{MarginLeft:20}}>hijkdfsd fsdh fsd fs df s df </h1>
        </>

    )
}


export default EmployeeProfile;