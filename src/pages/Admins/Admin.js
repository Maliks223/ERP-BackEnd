import React, { useState } from "react";
import "../Admins/Admin.css";
import Projects from "../projects/project.js";
import Axios from "axios";

const url = "http://localhost:8000/api/admin";

const Request = async () => {
  const res = await Axios.get(url).catch((err) => console.log(err));
  const data = await res.data;
  console.log(data);
  return data;
};

const Admin = () => {
  const [admin, setAdmin] = useState("");
  return (
    <div className="adminsPageWrapper">
      <Projects/>
    </div>
  );
};

export default Admin;
