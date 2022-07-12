import React, { useState ,useEffect } from "react";
import axios from "axios";
// import { Dialog } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  




const Project = ({ id, name,teamz}) => {
  const [Name, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  const [assignteam, setassignteam] = useState(false);
  const [team,setteam]=useState([]);

  const [teamzz,setteamzz]=useState("");
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

 

const Projectteam=async()=>{
const data=new FormData();
data.append("Team_id",teamzz);
data.append("Project_id",project);

  await axios.post("http://localhost:8000/api/teamproject",data)
    .catch((err)=>console.log(err));
  }

const func=(e)=>{
  setteamzz(e.target.value)
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



  



 

  return (
    <>
    <TableContainer component={Paper}>
    <Table  aria-label="customized table">
    <TableHead>
          <TableRow>
            <StyledTableCell align="center">Project name</StyledTableCell>
            <StyledTableCell align="center">teams</StyledTableCell>
            <StyledTableCell align="center">id</StyledTableCell>

          </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              
              </StyledTableCell>
              <StyledTableCell align="center">{name}</StyledTableCell>
              <StyledTableCell align="center">{teamz}</StyledTableCell>
              <StyledTableCell align="center">{id}</StyledTableCell>

      
            </StyledTableRow>
        </TableBody>
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
            {/* <i id="delete" className="singlePostIcon far fa-trash-alt"></i> */}
          </button>
          <button
            id="icons"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            edit
            {/* <i id="editt" className="singlePostIcon far fa-edit"></i>{" "} */}
          </button>
         
          <button
            id="icons"
            onClick={() => {
              setassignteam(!assignteam);
            }}
          >
            assign to a team
            {/* <i id="team" className="singlePostIcon far fa-edit"></i>{" "} */}
          </button>
        </div>
      </div>

      <div>
        {edit && (
          <Dialog open={edit} onClose={() => setEdit(!edit)}>
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
          </Dialog>
        )}
      </div>

      
      {assignteam &&
<Dialog open={assignteam}onClose={()=>setassignteam(!assignteam)}>
      <div>
        <form onSubmit={(e)=>{Projectteam()}}>
          {/* <input defaultValue={project} name="Project_id"/>
            <label htmlFor="team">Choose a team:</label>
             <div  > 
          
          </div>  */}
<input name="project"type="text"placeholder="project" onChange={(e)=>{setproject(e.target.value)}}/>
<div>
<select  name="team"id="team"onChange={func}>
            {team && team.map((e, i) => <option key={i} value={e.id}>{e.name}</option>)}
          </select>
          </div>
          <button type="submit">submit</button>

        </form>
      </div>
      
      </Dialog>
      }
      </Table>
      </TableContainer>
    </>
  );
};
export default Project;
