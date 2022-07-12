import React, { useEffect, useState } from "react";
import "./project.css";
import Project from "./projectmodule";
import Axios from "axios";
import { Dialog } from "@mui/material";

const Projects = () => {
  const [projects, setprojects] = useState([]);
  const [postname, setpostname] = useState("");
  const [post, setPost] = useState(false);



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

  const handlePost = async () => {
    const data = new FormData();
    data.append("name", postname);

    await Axios
      .post("http://localhost:8000/api/project", data)
      .catch((err) => console.log(err));
  };

  return (
    <>
     <button
            id="icons"
            onClick={() => {
              setPost(!post);
            }}
          >
            postttttttttttttttttttttttttttttttttttttttttttttttttttttttt
            {/* <i id="post" className="singlePostIcon far fa-edit"></i>{" "} */}
          </button>
          {post && (
        <Dialog open={post}onClose={()=>{setPost(!post)}}>
        <div>
          <form
            onSubmit={(e) => {
              handlePost();
            }}
          >
            <input
              name="name"
              placeholder="projectName"
            //   onFocus={true}
              type="text"
              onChange={(e) => {
                setpostname(e.target.value);
              }}
            />
            <button type="submit">submit</button>
          </form>
        </div>
        </Dialog>
      )}

    <div className="ProjectContainer">
      {projects.map((project, index) => {
        return (
          <Project
            key={index}
            name={project.name}
            id={project.id}
            // teamz={project.team[0].name}
            //  team={project.team[1]}
            teamz={project.team.map((teams, index) => {
              return (
                <div key={index}>
                  {teams.name}
                 

                   
                  
                </div>
              );
            })}
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
