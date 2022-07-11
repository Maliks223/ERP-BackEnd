import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./project.css";
import Project from "./projectmodule";
import Axios from "axios";

const Projects = () => {
  const [projects, setprojects] = useState([]);

  const Request = async () => {
    const res = await Axios.get("http://localhost:8000/api/project").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setprojects(data));
  }, []);

  return (
    <>

    <div className="ProjectContainer">
      {projects.map((project, index) => {
        return (
          <Project
            key={index}
            name={project.name}
            id={project.id}
            //  team={project.team[1]}
            // team={project.team.map((teams, index) => {
            //   return (
            //     <div key={index}>
            //       {teams.name}
                 

                   
                  
            //     </div>
            //   );
            // })}
          />
        );
      })}
    </div>
  </>);
};
export default Projects;



 // .map((fuckingteam,index)=>{
                    // return (<div key={index}>
                    // {fuckingteam.name}
                    //     </div>)
                    // })
