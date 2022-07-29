import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Menu from "../../components/circular navigation/circular";
import "./home.css";

const Home = () => {
  const id = localStorage.getItem("id");
  const [user, setuser] = useState([]);

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/getAdmin/${id}`);
      const response = await res.json();
      setuser(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="homecontainer">
        <div className="menuloc">
          <Menu />
        </div>

        <div className="profileCard">
          <div className="cardcontent">
            <div>
              <img
                className="profile-image"
                src={`http://localhost:8000/storage/uploads/${user.profile_image}`}
                alt={user.name}
              />
            </div>
            <div className="seconddiv">
              <h2 className="name">Name : {user.name}</h2>
              <h2>Email : {user.email}</h2>
              <h2 className="role">
                Role : {user.role === 0 ? "Admin" : "Super Admin"}
              </h2>
              <button className="but">EDIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
