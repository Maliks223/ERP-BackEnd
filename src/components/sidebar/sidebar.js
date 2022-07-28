//import useState hook to create menu collapse state
import React, { useState } from "react";
import { GiEnergySword } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
//import react pro sidebar components
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent } from "react-pro-sidebar";

//import icons from react icons
import { FaProjectDiagram } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { RiProjector2Line, RiTeamFill } from "react-icons/ri";
import { BiBody } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

import { Link, useNavigate } from "react-router-dom";


const SideBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      const response = await res.json();
      console.log(response);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      navigate('/login');
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div id="header">
        <ProSidebar >
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={window.location.pathname === "/" ? true : false} icon={<FiHome />}>
                Home<Link to="/" />
              </MenuItem>
              <MenuItem active={window.location.pathname === "/employees" ? true : false} icon={<BiBody />}><span style={window.location.pathname === "/employees" ? {color:'white'} : {}}>Employees</span><Link to="/employees" /></MenuItem>
              <MenuItem active={window.location.pathname === "/kpis" ? true : false} icon={< FaProjectDiagram />}><span style={window.location.pathname === "/kpis" ? {color:'white'} : {}}>KPI</span><Link to="/kpis" /></MenuItem>
              <MenuItem active={window.location.pathname === "/projects" ? true : false} icon={<RiProjector2Line />}><span style={window.location.pathname === "/projects" ? {color:'white'} : {}}>Projects</span><Link to="/projects" /></MenuItem>
              <MenuItem active={window.location.pathname === "/teams" ? true : false} icon={<RiTeamFill />}><span style={window.location.pathname === "/teams" ? {color:'white'} : {}}>Teams  </span><Link to="/teams" /></MenuItem>
              <MenuItem active={window.location.pathname === "/admin" ? true : false} icon={<RiAdminLine />}><span style={window.location.pathname === "/admin" ? {color:'white'} : {}}>Admins  </span><Link to="/admin" /></MenuItem>
              <MenuItem active={window.location.pathname === "/roles" ? true : false} icon={<GiEnergySword />}><span style={window.location.pathname === "/roles" ? {color:'white'} : {}}>Roles</span><Link to="/roles" /></MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem onClick={logout} icon={<FiLogOut />}>Logout<Link to='/login' /></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;
