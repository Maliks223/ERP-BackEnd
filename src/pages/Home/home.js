import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to='/home/projects'>
                Hello projects
            </Link>
        </div>
    );
};
export default Home;
