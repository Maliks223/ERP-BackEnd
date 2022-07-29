import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "../../components/circular navigation/circular";
import "./home.css";
import AdminEdit from "../../components/Admin_edit/admin_edit";
import NavBar from "../../components/navbar/navbar.js"
import CompanyData from '../../components/CompanyData/companyData.js';




const Home = () => {
    const navigate = useNavigate();
    const id = localStorage.getItem("id");
    const [user, setuser] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchAdmin = async () => {
        const res = await fetch(`http://localhost:8000/api/getAdmin/${id}`);
        const response = await res.json();
        setuser(response);
    }

    useEffect(() => {
        fetchAdmin();
    }, [])

    return (
        <>
        <NavBar/>
            <div className="background"></div>
            <div className="homecontainer">
                <div className="menuloc">
                    <Menu />
                </div>
                {/* <div className="companyDataWrapper">
                    My company Information
                <CompanyData title={"Employees"} number={20}/>
                <CompanyData title={"Teams"} number={4}/>
                <CompanyData title={"Projects"} number={8}/>

                </div> */}
                <div className="profileCard">
                    <div className="direction">
                        <Button onClick={handleClickOpen} >
                            <EditIcon sx={{ transform: "scale(1.5)" }} color="success" />
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Edit Your Profile Info</DialogTitle>
                            <DialogContent>
                                <AdminEdit data={user} />
                            </DialogContent>
                        </Dialog>
                        <div className="cardcontent">
                            <div>
                                <img
                                    className="profile-image"
                                    src={`http://localhost:8000/storage/uploads/${user.profile_image}`}
                                    alt={user.name}
                                />
                            </div>
                            <div className="userInfo">

                                <h2>Name : {user.name}</h2>
                                <h2>Email : {user.email}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
