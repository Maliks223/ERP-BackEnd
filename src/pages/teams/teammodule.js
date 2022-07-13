import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@mui/material";
const Team = ({ name, project, id }) => {
  const [Name, setname] = useState(name);
  const [edit, setedit] = useState(false);
  const[projects,setproject]=useState([]);
  const[projectz,setprojectz]=useState("");
  const[team,setteam]=useState("");


  const [assignproject,setassignproject]=useState(false);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/teams/${id}`)
      .then((response) => response.data)
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  };

  const handleEdit = async (id) => {
    const data = new FormData();
    data.append("_method", "PATCH");
    data.append("name", Name);

    await axios
      .post(`http://localhost:8000/api/teams/${id}`, data)
      .catch((err) => console.log(err));
  };

  const Projectteam=async()=>{
    const data=new FormData();
    data.append("Team_id",team);
    data.append("Project_id",projectz);
    
      await axios.post("http://localhost:8000/api/teamproject",data)
        .catch((err)=>console.log(err));
      }


  const Request = async () => {
    const res = await axios.get("http://localhost:8000/api/project").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setproject(data));
  }, []);

  return (
    <div>
      <h1>{name}</h1>
      <h1>{project}</h1>
      <h1>{id}</h1>

      <button onClick={() => handleDelete(id)}>delete</button>
      <button
        onClick={() => {
          setedit(!edit);
        }}
      >
        edit
      </button>
      <button onClick={() => setassignproject(!assignproject)}>assign a project</button>


      {edit && (
        <Dialog open={edit} onClose={() => setedit(!edit)}>
          <form onSubmit={(e) => handleEdit(id)}>
            <input
              name="name"
              defaultValue={Name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <button type="submit">submit</button>
          </form>
        </Dialog>
      )}
      {assignproject &&
      
      <Dialog open={assignproject}onClose={()=>setassignproject(!assignproject)}>
        <form onSubmit={(e)=>{Projectteam()}}>
        <input name="team" onChange={(e)=>setteam(e.target.value)} />
        <select name="project" onChange={(e)=>setprojectz(e.target.value)} value={projectz}>
            {projects && projects.map((e,i)=><option value={e.id}>{e.name}</option>)}
        </select>
        <button type="submit">submit</button>
        </form>
        </Dialog>}
    </div>
  );
};
export default Team;
