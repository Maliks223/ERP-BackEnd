
//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {ProSidebar,Menu,MenuItem,SidebarHeader,SidebarFooter,SidebarContent,} from "react-pro-sidebar";

//import icons from react icons
import { FaProjectDiagram } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiProjector2Line, RiTeamFill } from "react-icons/ri";
import { BiBody } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.css";

import { Link } from "react-router-dom";


const SideBar = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Logo"}</p>
              {/* <h1 icon={<FiHome/>}></h1> */}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Home<Link to="/home"/>
              </MenuItem>
              <MenuItem icon={<BiBody />}>Employees<Link to="/employees"/></MenuItem>
             <MenuItem icon={< FaProjectDiagram/>}>Kpi's<Link to="/kpis"/></MenuItem>
             <MenuItem icon={<RiProjector2Line />}>Projects<Link to="/projects"/></MenuItem> 
              <MenuItem icon={<RiTeamFill />}>Teams<Link to="/teams"/></MenuItem>
             

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout<Link to="#"/></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;