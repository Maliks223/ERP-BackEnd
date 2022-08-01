import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";



export default function NavBar() {

  const id = localStorage.getItem("id");
  const [user, setuser] = useState([]);
  const [employee, setEmployee] = useState('');
  const navigate = useNavigate();

  const fetchAdmin = async () => {
    const res = await fetch(`http://localhost:8000/api/getAdmin/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
    const response = await res.json();
    setuser(response);
  }

  const handleChange = (e) => {
    setEmployee(e.target.value)
  }

  useEffect(() => {
    fetchAdmin();
  }, [])

  return (
    <div className="navbarContainer">
      <img
        className="user-image"
        src={`http://localhost:8000/storage/uploads/${user.profile_image}`}
        alt={user.name}
      />
      <input className="searchinput" type="text" placeholder="Search Employee"
        onChange={handleChange}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            if (employee) {
              navigate('/employees', { state: { employee } }, { replace: true })
            }
            else {
              navigate('/employees', { state: "" }, { replace: true })
            }
          }
        }} />
      <div className="logotext">
        <img className="rotate" src={require('./malek.png')} />
        <img className="taz" src={require('./tazkarje.png')} />
      </div>
    </div>
  );
}