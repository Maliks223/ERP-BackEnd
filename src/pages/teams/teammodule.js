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
    fontSize: 15,
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

const Team = ({ name, project, id, pivotId, members, fetchTeams }) => {
  const [Name, setname] = useState(name);
  const [edit, setEdit] = useState(false);
  const [projects, setproject] = useState([]);
  const [projectz, setprojectz] = useState([]);
  const [team, setteam] = useState("");
  const [opendelete, handleclosedelete] = useState(false);
  const [deleteproject, setdeleteproject] = useState(false);
  const [pivotid, setpivot] = useState(0);
  const [show, setshow] = useState(false);

  const [assignproject, setassignproject] = useState(false);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/teams/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then((response) => response.data)
      .then(() => fetchTeams())
      .then(() => handleclosedelete(false))
      .catch((err) => console.log(err));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("_method", "PATCH");
    data.append("name", Name);

    await axios
      .post(`http://localhost:8000/api/teams/${id}`, data,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        })
      .then(() => fetchTeams())
      .then(() => setEdit(false))
      .catch((err) => console.log(err));
  };

  const Projectteam = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Team_id", id);
    data.append("Project_id", projectz);
    await axios
      .post("http://localhost:8000/api/teamproject", data,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        })
      .then(res => console.log(res))
      .then(() => fetchTeams())
      .then(() => setassignproject(false))
      .catch((err) => { console.log(err); setassignproject(false) });
  };

  const handleDeleteProjectTeam = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/teamproject/${pivotid}`)
      .then((response) => response.data)
      .then(() => fetchTeams())
      .then(() => setdeleteproject(false))
      .catch((err) => console.log(err));
  };

  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/project", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
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
          {members && members.length}
        </StyledTableCell>

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
              Are you sure you want to Delete this Team?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => {
                  handleDelete(id);
                }}
                color="error"
                className="addEmployeeBtnY"
                variant="contained"
                style={{
                  backgroundColor: "grey",
                  marginRight: "30px",
                  marginBottom: "30px",
                  marginLeft: "15px",
                  backgroundColor: "red",
                  minWidth: "8vw",
                  transition: "0.1s ease-in-out",
                }}
              >
                Yes
              </Button>
              <Button
                onClick={(e) => {
                  handleclosedelete(!opendelete);
                }}
                variant="contained"
                className="addEmployeeBtn"
                style={{
                  backgroundColor: "var(--blue)",
                  marginBottom: "30px",
                  marginRight: "15px",
                  minWidth: "8vw",
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            onClick={() => setassignproject(!assignproject)}
            sx={{
              backgroundColor: "var(--blue)",
              width: "8.6vw",
              marginRight: "8px",
            }}
            className="addEmployeeBtn"
            type="submit"
            variant="contained"
          >
            Assign a project
          </Button>
          <Button
            sx={{
              backgroundColor: "var(--blue)",
              width: "8.6vw",
              marginRight: "8px",
            }}
            className="addEmployeeBtn"
            onClick={(e) => {
              setdeleteproject(!deleteproject);
            }}
            variant="contained"
          >
            Delete project
          </Button>
          <Dialog
            open={deleteproject}
            onClose={(e) => {
              setdeleteproject(!deleteproject);
            }}
          >
            <DialogTitle sx={{ width: "15vw", margin: "auto" }}>
              Delete Assigned project
            </DialogTitle>
            <DialogContent>
              <form >
                <select
                  style={{
                    width: "15vw",
                    backgroundColor: "var(--blue)",
                    color: "white",
                    padding: "3px 3px 10px 3px",
                    margin: "36px 36px 75px 36px",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18px",
                  }}
                  name="team"
                  id="team"
                  onChange={(e) => {
                    setpivot(e.target.value);
                  }}
                // style={{ padding: "3px 3px 10px 3px", margin: "11px" }}
                >
                  <option>Projects</option>
                  {pivotId &&
                    pivotId.map((e, i) => (
                      <option key={i} value={e.pivot.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
                <DialogActions>
                  <Button
                    color="error"
                    className="addEmployeeBtnY"
                    variant="contained"
                    style={{
                      backgroundColor: "grey",
                      marginRight: "30px",
                      marginBottom: "30px",
                      marginLeft: "15px",
                      backgroundColor: "red",
                      minWidth: "8vw",
                      transition: "0.1s ease-in-out",
                    }}
                    onClick={handleDeleteProjectTeam}
                  >
                    Delete project
                  </Button>
                  <Button
                    onClick={() => {
                      setdeleteproject(!deleteproject);
                    }}
                    className="addEmployeeBtn"
                    sx={{ backgroundColor: "var(--blue)", width: "8vw", marginBottom: "30px" }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          {members && members.length!=0 &&
            <>
              <Button
                className="addEmployeeBtn"
                sx={{ backgroundColor: "var(--blue)", width: "8.6vw" }}
                onClick={() => {
                  setshow(!show);
                }}
                variant="contained"
              >
                Show Members
              </Button>
              <Dialog open={show} onClose={() => setshow(!show)}>
                <DialogTitle style={{ margin: "30px" }}>
                  Members of {name}'s team
                </DialogTitle>
                <div>
                  {members.map((member, i) => {
                    return (
                      <h4 key={i} style={{ paddingLeft: "20px" }}>
                        {i + 1}
                        {". "}
                        {member.firstname} {member.lastname}
                      </h4>
                    );
                  })}
                </div>
                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    sx={{
                      backgroundColor: "var(--blue)",
                      width: "8.6vw",
                      margin: "auto",
                    }}
                    onClick={() => setshow(!show)}
                    variant="contained"
                  >
                    close
                  </Button>
                </DialogActions>

                <DialogContent></DialogContent>
              </Dialog>
            </>}
        </StyledTableCell>

        {edit && (
          <Dialog open={edit} onClose={() => setEdit(!edit)}>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogContent>
              <form onSubmit={(e) => handleEdit(e)}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="Name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  defaultValue={Name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "var(--blue)", width: "8vw" }}
                  >
                    Confirm Edit
                  </Button>
                  <Button
                    className="addEmployeeBtn"
                    variant="contained"
                    sx={{ backgroundColor: "var(--blue)", width: "8vw" }}
                    onClick={() => {
                      setEdit(!edit);
                    }}
                  >
                    Cancelsss
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
        {assignproject && (
          <Dialog
            open={assignproject}
            onClose={() => setassignproject(!assignproject)}
          >
            <DialogTitle>Assign A Project</DialogTitle>
            <DialogContent>
              <form
                onSubmit={(e) => {
                  Projectteam(e);
                }}
              >
                {/* <TextField
                name="team"
                onChange={(e) => setteam(e.target.value)}
              /> */}
                <select
                  style={{
                    width: "15vw",
                    padding: "3px 3px 10px 3px",
                    margin: "36px 36px 75px 36px",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "var(--blue)",
                    color: "white",
                    fontSize: "18px",
                  }}
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
                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--blue)",
                      width: "8vw",
                      marginRight: "20px",
                    }}
                  >
                    submit
                  </Button>
                  <Button
                    className="addEmployeeBtn"
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: "var(--blue)", width: "8vw" }}
                    onClick={() => {
                      setassignproject(!assignproject);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </StyledTableRow>
    </>
  );
};
export default Team;
