import React, { useState } from "react";
import axios from 'axios';
// import { Dialog } from "@mui/material";
import Dialog from '@mui/material/Dialog';

const Project=(props)=>{
  const[Name,setName]=useState(props.name);
  const[edit,setEdit]=useState(false);

const handleSubmit = async (id)=>{
    const data= new FormData();
    data.append("name",Name);


   await axios
   .post(`http://localhost:8000/api/project/${id}`,{
    _method: 'put',
    data:data,
}).catch((err)=> console.log(err));
}


    const handleDelete = async (id) => {
        await axios
            .delete(`http://localhost:8000/api/project/${id}`)
            .then((response) => response.data)
            .then((result) => window.location.reload())
            .catch((err) => console.log(err));
    };





    return (
        <>
        <div>
            <h1>name :{props.name}</h1>
            <div>
            <button sytle={{'padding':'10px'}} id="icon"
                            onClick={(e) => {
                                handleDelete(props.id);
                            }}
                        >delete
                            <i id="editt" className="singlePostIcon far fa-trash-alt"></i>
                        </button>
                        <button id="icons"
                            onClick={() => {
                                setEdit(!edit);
                            }}
                        >edit
                            <i id="editt" className="singlePostIcon far fa-edit"></i>{" "}
                        </button>
                        </div>
                     
                 <Dialog open={edit} onClose={()=>setEdit(!edit)}>
{edit && (
    <div>
                        <form onSubmit={(e)=>handleSubmit(props.id)}>
                            <div>
                        <input name="name"type="text"placeholder="projectName"autoFocus={true}
                        onChange={(e)=>{setName(e.target.value)}}/>
                          <button className="submitbutton" type="submit">
                                     submit
                                </button>
                                </div>
                        </form> 
                       
                        </div>

)}
                       </Dialog> 
                       
                

            
            
        
            
        </div>
        </>
    )
};
export default Project;