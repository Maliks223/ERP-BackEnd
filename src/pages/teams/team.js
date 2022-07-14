import React from "react";
import "./team.css";
import { useState ,useEffect } from "react";
import axios from "axios";
import { Dialog } from "@mui/material";
import Team from "./teammodule";
const Teams = () => {
const[team,setteam]=useState([]);
const[post,setpost]=useState(false);
const[name,setname]=useState("");

    const Post=async()=>{
      const data=new FormData();
       data.append("name",name);
    const res=await axios.post("http://localhost:8000/api/teams",data)
   .catch((err)=>console.log(err));
   };

 
  const Request = async () => {
    const res = await axios.get("http://localhost:8000/api/teams").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setteam(data));
  }, []);
  


  return (
    <>
    <div className="teamzo">
    <button onClick={()=>setpost(!post)}>postttttt</button>
    {post &&
    <Dialog open={post} onClose={()=>setpost(!post)}>
     <div>
      <form onSubmit={(e)=>Post()}>
        <input name="name"id="name"onChange={(e)=>{setname(e.target.value)}}/>
        <button type="submit">submit</button>
      </form>
     </div>
    </Dialog>
    
    }
    </div>
    <div className="TeamContainer">
      {team.map((teamm,index)=>{
        return (
          <Team 
          key={index}
          name={teamm.name}
          id={teamm.id}
          project={teamm.project.map((teammm,index)=>{
            return (
              <div key={index}>
              {teammm.name}
              </div>
            )
          })}
          
          />
        )
      })
       
      }
    </div>
    </>
  );
};
export default Teams;
