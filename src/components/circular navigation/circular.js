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
            <Link to="/employees" class="btn">
              <div title="Employees" class="btn">
                <i>
                  <BiBody style={{ fontSize: "30px" }} />
                </i>
              </div>
            </Link>
            <div title="Teams" class="btn">
              <Link to="/teams" class="btn">
                <div title="Teams" class="btn">
                  <i>
                    <RiTeamFill style={{ fontSize: "30px" }} />
                  </i>
                </div>
              </Link>
            </div>
            <Link to="/projects" class="btn">
              <div title="Project" class="btn">
                <i>
                  <RiProjector2Line style={{ fontSize: "30px" }} />
                </i>
              </div>
            </Link>
            <Link to="/kpis" class="btn">
              <div title="Kpis" class="btn">
                <i>
                  <FaProjectDiagram style={{ fontSize: "30px" }} />
                </i>
              </div>
            </Link>
            <Link to="/roles" class="btn">
              <div title="Roles" class="btn">
                <i>
                  <GiEnergySword style={{ fontSize: "30px" }} />
                </i>
              </div>
            </Link>
            <Link to="/admin" class="btn">
              <div title="Admins" class="btn">
                <i>
                  <RiAdminLine style={{ fontSize: "30px" }} />
                </i>
              </div>
            </Link>
          </label>
        </div>
      </body>
    </>
  );
};

export default Menu;
