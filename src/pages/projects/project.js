import React from "react";
import { Link } from "react-router-dom";
import './project.css';

const Projects = () => {
    return (
        <div className="ProjectContainer">
            <h1>Projects</h1>
            <Link to='/home'>
                back to home
            </Link>
        </div>
    );
};
export default Projects;
