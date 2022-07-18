import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Team = ({ name, project, id ,pivotId}) => {
  const [Name, setname] = useState(name);
  const [edit, setEdit] = useState(false);
  const [projects, setproject] = useState([]);
  const [projectz, setprojectz] = useState([]);
  const [team, setteam] = useState("");
  const [opendelete, handleclosedelete] = useState(false);
  const [deleteproject,setdeleteproject]=useState(false);
  const[pivotid,setpivot]=useState(0);


  const [assignproject, setassignproject] = useState(false);

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

  const Projectteam = async () => {
    const data = new FormData();
    data.append("Team_id", id);
    data.append("Project_id", projectz);

    await axios
      .post("http://localhost:8000/api/teamproject", data)
      .catch((err) => console.log(err));
  };

  const handleDeleteProjectTeam = async (e) => {
    await axios
      .delete(`http://localhost:8000/api/teamproject/${pivotid}`)
      .then((response) => response.data)
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  };


  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/project")
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setproject(data));
  }, []);

  return (
    <>

      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row" align="center">
          {id}
        </StyledTableCell>
        <StyledTableCell align="center">{name}</StyledTableCell>
        <StyledTableCell align="center">
          {project.length !== 0 ? project : "No Projects Assigned"}
        </StyledTableCell>
        <StyledTableCell align="center">
        <Button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <EditIcon color="success" />
          </Button>  
          <Button
            onClick={(e) => {
              handleclosedelete(!opendelete);
            }}
          >
            <DeleteIcon color="error" />
          </Button>   
          <Dialog
          open={opendelete}
          onClose={(e) => {
            handleclosedelete(!opendelete);
          }}
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this Employee?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                handleDelete(id);
              }}
              color="error"
            >
              Yes
            </Button>
            <Button
              onClick={(e) => {
                handleclosedelete(!opendelete);
              }}
            >
              No
            </Button>
          </DialogActions>
          </Dialog>
          <Button onClick={() => setassignproject(!assignproject)}>
            assign a project
          </Button>
          <Button onClick={(e)=>{setdeleteproject(!deleteproject)}}>
            delete project
          </Button>
          <Dialog open={deleteproject}onClose={(e)=>{setdeleteproject(!deleteproject)}}>
            <form onSubmit={(e)=>handleDeleteProjectTeam(pivotId)}>
          <select
                  name="team"
                  id="team"
                  onChange={(e)=>{setpivot(e.target.value)}}
                  style={{ padding: "3px 3px 10px 3px", margin: "11px" }}
                >
                  <option>Projects</option>
                  {pivotId &&
                    pivotId.map((e, i) => (
                      <option key={i} value={e.pivot.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
                <Button type="submit">delete Project</Button>
                </form>
          </Dialog>
        </StyledTableCell>


        {edit && (
          <Dialog open={edit} onClose={() => setEdit(!edit)}>
            <form onSubmit={(e) => handleEdit(id)}>
              <TextField
                name="name"
                defaultValue={Name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <Button type="submit">submit</Button>
            </form>
          </Dialog>
        )}
        {assignproject && (
          <Dialog
            open={assignproject}
            onClose={() => setassignproject(!assignproject)}
          >
            <form
              onSubmit={(e) => {
                Projectteam();
              }}
            >
              {/* <TextField
                name="team"
                onChange={(e) => setteam(e.target.value)}
              /> */}
              <select
                name="project"
                onChange={(e) => setprojectz(e.target.value)}
                value={projectz}
              >
                <option>Projects</option>
                {projects &&
                  projects.map((e, i) => (
                    
                    <option value={e.id}>{e.name}</option>
                  ))}
              </select>
              <Button type="submit">submit</Button>
            </form>
          </Dialog>
        )}
      </StyledTableRow>
    </>
  );
};
export default Team;
