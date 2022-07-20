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

const Project = ({ id, name, teamz, pivotId }) => {
  // console.log('ali',pivotId);
  const [Name, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  const [assignteam, setassignteam] = useState(false);
  const [opendelete, handleclosedelete] = useState(false);
  const [team, setteam] = useState([]);
  const [teamzz, setteamzz] = useState("");
  const [deleteteam, setdeleteteam] = useState(false);
  const [pivotid, setpivot] = useState(0);

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

  const Projectteam = async () => {
    const data = new FormData();
    data.append("Team_id", teamzz);
    data.append("Project_id", id);

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

  const func = (e) => {
    setteamzz(e.target.value);
  };

  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/teams")
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
            style={{
              backgroundColor: "grey",
              marginRight: "20px",
              marginLeft: "20px",
              border: ".5px solid black",
              backgroundColor: "#C6C4C4",
              minHeight: "2vh",
              minWidth: "4vw",
              color: "black",
            }}
            id="icons"
            onClick={() => {
              setassignteam(!assignteam);
            }}
          >
            assign to a team
          </Button>

          <Button
            onClick={(e) => {
              setdeleteteam(!deleteteam);
            }}
            className="addEmployeeBtn"
            style={{
              backgroundColor: "grey",
              // marginRight: "65px",
              border: ".5px solid black",
              backgroundColor: "#C6C4C4",
              minHeight: "2vh",
              minWidth: "4vw",
              color: "black",
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
            <form onSubmit={(e) => handleDeleteProjectTeam(pivotId)}>
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
                className="addEmployeeBtn"
                style={{
                  backgroundColor: "grey",
                  marginLeft: "120px",
                  marginBottom: "36px",
                  border: ".5px solid black",
                  backgroundColor: "#C6C4C4",
                  minHeight: "2vh",
                  minWidth: "4vw",
                  color: "black",
                }}
              >
                delete team
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
              className="addEmployeeBtn"
              style={{
                backgroundColor: "grey",
                // marginRight: "65px",
                border: ".5px solid black",
                backgroundColor: "#C6C4C4",
                minHeight: "2vh",
                minWidth: "4vw",
                color: "black",
              }}
            >
              Yes
            </Button>
            <Button
              onClick={(e) => {
                handleclosedelete(!opendelete);
              }}
              className="addEmployeeBtn"
              style={{
                backgroundColor: "grey",
                // marginRight: "65px",
                border: ".5px solid black",
                backgroundColor: "#C6C4C4",
                minHeight: "2vh",
                minWidth: "4vw",
                color: "black",
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
              <form onSubmit={(e) => handleSubmit(id)}>
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
                    style={{
                      backgroundColor: "grey",
                      marginRight: "65px",
                      border: ".5px solid black",
                      backgroundColor: "#C6C4C4",
                      minHeight: "2vh",
                      minWidth: "4vw",
                      color: "black",
                    }}
                    type="submit"
                  >
                    Edit
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
                  Projectteam();
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
                    style={{
                      backgroundColor: "grey",
                      margin: "auto",
                      border: ".5px solid black",
                      backgroundColor: "#C6C4C4",
                      minHeight: "2vh",
                      minWidth: "4vw",
                      color: "black",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                  {/* <Button onClick={(e) => { handleDeleteProjectTeam(id) }}>Remove Team</Button> */}
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
