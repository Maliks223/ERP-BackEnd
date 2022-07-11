import React, { useState ,useEffect } from "react";
import axios from "axios";
// import { Dialog } from "@mui/material";
import Dialog from "@mui/material/Dialog";

const Project = ({ id, name,teamz}) => {
  const [Name, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState(false);
  const [assignteam, setassignteam] = useState([]);
  const [postname, setpostname] = useState("");
  const [team,setteam]=useState([]);
  const [project,setproject]=useState(name);


  const handleSubmit = async (id) => {
    const data = new FormData();
    data.append("_method", "PATCH");
    data.append("name", Name);

    await axios
      .post(`http://localhost:8000/api/project/${id}`, data)
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {

    await axios
      .delete(`http://localhost:8000/api/project/${id}`)
      .then((response) => response.data)
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handlePost = async () => {
    const data = new FormData();
    data.append("name", postname);

    await axios
      .post("http://localhost:8000/api/project", data)
      .catch((err) => console.log(err));
  };

const Projectteam=async()=>{
const data=new FormData();
data.append("Team_id",team);
data.append("Project_id",project)

    const res=await axios.post("http://localhost:8000/api/teamproject",data)
    .catch((err)=>console.log(err));
  }


  const Request = async () => {
    const res = await axios.get("http://localhost:8000/api/teams").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
     setteam(data);
  };
  useEffect(() => {
    Request();
  }, []);

  const func=(e)=>{
   setteam(e.target.value);
  }

  



 

  return (
    <>
      <div>
        <h1>name :{name}</h1>
        <h1>name :{teamz}</h1>

        <div>
          <button
            sytle={{ padding: "10px" }}
            id="icon"
            onClick={(e) => {
              handleDelete(id);
            }}
          >
            delete
            <i id="delete" className="singlePostIcon far fa-trash-alt"></i>
          </button>
          <button
            id="icons"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            edit
            <i id="editt" className="singlePostIcon far fa-edit"></i>{" "}
          </button>
          <button
            id="icons"
            onClick={() => {
              setPost(!post);
            }}
          >
            post
            <i id="post" className="singlePostIcon far fa-edit"></i>{" "}
          </button>
          <button
            id="icons"
            onClick={() => {
              setassignteam(!assignteam);
            }}
          >
            assign to a team
            <i id="team" className="singlePostIcon far fa-edit"></i>{" "}
          </button>
        </div>
      </div>

      <div open={edit} onClose={() => setEdit(!edit)}>
        {edit && (
          <div>
            <form onSubmit={(e) => handleSubmit(id)}>
              <div>
                <input
                  defaultValue={name}
                  name="name"
                  type="text"
                  placeholder="projectName"
                  autoFocus={true}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button className="submitbutton" type="submit">
                  submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {post && (
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
      )}
      {assignteam &&

      <div>
        <form onSubmit={Projectteam}>
            <input defaultValue={project} name="Project_id"/>
            <label htmlFor="team">Choose a team:</label>
            {/* <div  > */}
            <select  name="Team_id" id={id} onChange={func}>
            {team && team.map((e, i) => <option key={i} value={e.id}>{e.name}</option>)}
          </select>
          {/* </div> */}
          <button type="submit">submit</button>

        </form>
      </div>
      
      
      }
    </>
  );
};
export default Project;
