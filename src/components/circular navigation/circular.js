import { Icon } from "@mui/material";
import React from "react";
import { BiBody } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import {
  RiProjector2Fill,
  RiProjector2Line,
  RiTeamFill,
  RiAdminLine,
} from "react-icons/ri";
import { GiEnergySword } from "react-icons/gi";
import "./circular.css";
import { Link } from "react-router-dom";



const Menu = () => {
  return (
    <>
      <body className="bodyz">
        <div class="menu">
          <input type="checkbox" className="inputz" id="toggle" />
          <label id="show-menu" for="toggle">
            <div class="btn" stye={{ color: "white" }}>
              <i>
                <FiHome style={{ fontSize: "30px" }} />
              </i>
              <i>Home</i>
            </div>

            <div title="Employees" class="btn">
              <Link to="/employees">
                <i>
                  <BiBody style={{ fontSize: "30px" }} />
                </i>
              </Link>
            </div>
            <div title="Kpis" class="btn">
              <Link to="/kpis">
                <i>
                  <FaProjectDiagram style={{ fontSize: "30px" }} />
                </i>
              </Link>
            </div>
            <div title="Project" class="btn">
              <Link to="/projects">
                <i>
                  <RiProjector2Line style={{ fontSize: "30px" }} />
                </i>
              </Link>
            </div>
            <div title="Teams" class="btn">
              <Link to="/teams">
                <i>
                  <RiTeamFill style={{ fontSize: "30px" }} />
                </i>
              </Link>
            </div>
            <div title="Admins" class="btn">
              <i>
                <RiAdminLine style={{ fontSize: "30px" }} />
              </i>
            </div>
            <div title="Roles" class="btn">
              <Link to="/roles">
                <i>
                  <GiEnergySword style={{ fontSize: "30px" }} />
                </i>
              </Link>
            </div>
          </label>
        </div>
      </body>
    </>
  );
};

export default Menu;
