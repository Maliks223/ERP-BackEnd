import React from "react";
import './employeeProfileCard.css'


const CardId = ({ data }) => {
    const { id, firstname, lastname, image, phonenumber, email, teams } = data;
    return (
        <>
            <body class="bg-grid-line"></body>
            <div class="card">
                <header>
                </header>
                <article>
                    <img id="thumb"  src={`http://localhost:8000/storage/uploads/${image}`} />
                    <h2>{firstname} {`  `}{lastname}</h2>
                    <h3>Email: {email}</h3>
                    <h3>Phone Number: {phonenumber}</h3>
                    <h3>Team: {teams.name}</h3>
                    {/* <div class="area">
                    </div> */}
                </article>
            </div>
        </>
    )
}
export default CardId;