import React, { useState, useEffect } from "react";
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

const Project = ({ id, name, teamz, pivotId, fetchProjects }) => {
  // console.log('ali',pivotId);
  const [Name, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  const [assignteam, setassignteam] = useState(false);
  const [opendelete, handleclosedelete] = useState(false);
  const [team, setteam] = useState([]);
  const [teamzz, setteamzz] = useState("");
  const [deleteteam, setdeleteteam] = useState(false);
  const [pivotid, setpivot] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("_method", "PUT");
    data.append("name", Name);

    await axios
      .post(`http://localhost:8000/api/project/${id}`, data, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(() => fetchProjects())
      .then(() => setEdit(false))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (e) => {
    await axios
      .delete(`http://localhost:8000/api/project/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(() => fetchProjects())
      .then(() => handleclosedelete(false))
      .catch((err) => console.log(err));
  };

  const Projectteam = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Team_id", teamzz);
    data.append("Project_id", id);

    await axios
      .post("http://localhost:8000/api/teamproject", data, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(() => fetchProjects())
      .then(() => setassignteam(false))
      .catch((err) => console.log(err));
  };

  const handleDeleteProjectTeam = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/teamproject/${pivotid}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(() => fetchProjects())
      .then(() => setdeleteteam(false))
      .catch((err) => console.log(err));
  };

  const func = (e) => {
    setteamzz(e.target.value);
  };

  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/teams", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    // console.log(data);
    setteam(data);
  };

  useEffect(() => {
    Request();
  }, []);

  return (
    <>
      <StyledTableRow key={id}>
        <StyledTableCell component="th" scope="row" align="center">
          {id}
        </StyledTableCell>
        <StyledTableCell align="center">{name}</StyledTableCell>
        <StyledTableCell align="center">
          {teamz.length !== 0 ? teamz : "No Teams Assigned"}
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
          <Button
            className="addEmployeeBtn"
            variant="contained"
            style={{
              marginRight: "20px",
              marginLeft: "20px",
              backgroundColor: "var(--blue)",
              Width: "8vw",
            }}
            id="icons"
            onClick={() => {
              setassignteam(!assignteam);
            }}
          >
            assign a team
          </Button>

          <Button
            onClick={(e) => {
              setdeleteteam(!deleteteam);
            }}
            className="addEmployeeBtn"
            variant="contained"
            style={{
              backgroundColor: "grey",
              // marginRight: "65px",
              backgroundColor: "var(--blue)",
              Width: "8vw",
            }}
          >
            delete team
          </Button>
          <Dialog
            open={deleteteam}
            onClose={(e) => {
              setdeleteteam(!deleteteam);
            }}
          >
            <form onSubmit={(e) => handleDeleteProjectTeam(e)}>
              <h4 className="deleteTeamForm">Delete team </h4>
              <select
                name="team"
                id="team"
                onChange={(e) => {
                  setpivot(e.target.value);
                }}
                style={{
                  width: "15vw",
                  padding: "3px 3px 10px 3px",
                  margin: "36px 36px 75px 36px",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--blue)",
                  color: "white",
                  fontSize: "18px"
                }}
              >
                <option>Teams</option>
                {pivotId &&
                  pivotId.map((e, i) => (
                    <option key={i} value={e.pivot.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
              <Button
                type="submit"
                variant="contained"
                className="addEmployeeBtnY"
                color="error"
                style={{
                  marginLeft: "15px",
                  marginRight: "25px",
                  marginBottom: "36px",
                  backgroundColor: "red",
                  minWidth: "8vw",
                }}
              >
                delete team
              </Button>
              <Button
                className="addEmployeeBtn"
                variant="contained"
                style={{
                  marginBottom: "36px",
                  // margin: "auto",
                  backgroundColor: "var(--blue)",
                  minWidth: "8vw",
                }}
                onClick={() => {
                  setdeleteteam(false)
                }}
              >
                Cancel
              </Button>
            </form>
          </Dialog>
        </StyledTableCell>
        <Dialog
          open={opendelete}
          onClose={(e) => {
            handleclosedelete(!opendelete);
          }}
        >
          <DialogTitle>Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to Delete this Project ?
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
                transition: "0.1s ease-in-out"
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

        {edit && (
          <Dialog open={edit} onClose={() => setEdit(!edit)}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
              <form onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  defaultValue={name}
                  name="name"
                  type="text"
                  placeholder="projectName"
                  autoFocus={true}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    variant="contained"
                    style={{
                      backgroundColor: "var(--blue)",
                      marginRight: "30px",
                      marginTop: "28px",
                      minWidth: "8vw",

                    }}
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button
                    className="addEmployeeBtn"
                    variant="contained"
                    style={{
                      backgroundColor: "var(--blue)",
                      marginRight: "30px",
                      marginTop: "28px",
                      minWidth: "8vw",

                    }}
                    onClick={() => {
                      setEdit(false)
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
        {assignteam && (
          <Dialog open={assignteam} onClose={() => setassignteam(!assignteam)}>
            <DialogTitle>Assign Project to a Team</DialogTitle>

            <DialogContent>
              <form
                onSubmit={(e) => {
                  Projectteam(e);
                }}
              >
                <select
                  name="team"
                  id="team"
                  onChange={func}
                  style={{
                    width: "15vw",
                    padding: "3px 3px 10px 3px",
                    margin: "36px 36px 75px 36px",
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    backgroundColor: "var(--blue)",
                    fontSize: "18px"

                  }}
                >
                  <option>Teams</option>
                  {team &&
                    team.map((e, i) => (
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>

                <DialogActions>
                  <Button
                    className="addEmployeeBtn"
                    variant="contained"
                    style={{
                      margin: "auto",
                      backgroundColor: "var(--blue)",
                      minWidth: "8vw",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    className="addEmployeeBtn"
                    variant="contained"
                    style={{
                      margin: "auto",
                      backgroundColor: "var(--blue)",
                      minWidth: "8vw",
                    }}
                    onClick={() => {
                      setassignteam(false)
                    }}
                  >
                    cancel
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
export default Project;
