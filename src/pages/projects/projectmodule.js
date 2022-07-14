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

const Project = ({ id, name, teamz }) => {
  const [Name, setName] = useState(name);
  const [edit, setEdit] = useState(false);
  const [assignteam, setassignteam] = useState(false);
  const [opendelete, handleclosedelete] = useState(false);
  const [team, setteam] = useState([]);
  const [teamzz, setteamzz] = useState("");
  const [project, setproject] = useState(name);

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

  const func = (e) => {
    setteamzz(e.target.value);
  };
  const Request = async () => {
    const res = await axios
      .get("http://localhost:8000/api/teams")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
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
          {teamz ? teamz : "<h1>No Teams Assigned<h1>"}
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
            style={{
              color: "blue",
              border: "0.1px solid black",
              borderRadius: "2px",
            }}
            id="icons"
            onClick={() => {
              setassignteam(!assignteam);
            }}
          >
            assign to a team
          </Button>
        </StyledTableCell>
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

        {/* <button
            sytle={{ padding: "10px" }}
            id="icon"
            onClick={(e) => {
              handleDelete(id);
            }}
          >
            delete
          </button>
          <button
            id="icons"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            edit
          </button>
          */}

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
                  <Button className="submitButton" type="submit">
                    Edit
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        )}
{/* ............. */}
        {assignteam && (
          <Dialog open={assignteam} onClose={() => setassignteam(!assignteam)}>
            <DialogTitle>Assign Project to a Team</DialogTitle>

            <DialogContent>
              <form
                onSubmit={(e) => {
                  Projectteam();
                }}
              >
                {/* <TextField defaultValue={project} name="Project_id"/> */}
                {/* <label htmlFor="team">Choose a team:</label> */}

                {/* <TextField
                  name="project"
                  type="text"
                  placeholder="project"
                  label="project id"
                  value={id}
                  onChange={(e) => {
                    setproject(e.target.value);
                  }}
                /> */}
                <select
                  name="team"
                  id="team"
                  onChange={func}
                  style={{ padding: "3px 3px 10px 3px", margin: "11px" }}
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
                  <Button className="submitButton" type="submit">
                    Submit
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
