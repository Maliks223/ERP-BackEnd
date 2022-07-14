import React, { useEffect, useState } from "react";
import "./project.css";
import Project from "./projectmodule";
import Axios from "axios";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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

const Projects = () => {
  const [projects, setprojects] = useState([]);
  const [postname, setpostname] = useState("");
  const [post, setPost] = useState(false);

  const Request = async () => {
    const res = await Axios.get("http://localhost:8000/api/project").catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    Request().then((data) => setprojects(data));
  }, []);

  const handlePost = async () => {
    const data = new FormData();
    data.append("name", postname);

    await Axios.post("http://localhost:8000/api/project", data).catch((err) =>
      console.log(err)
    );
  };

  return (
    <>
      <button
        id="icons"
        onClick={() => {
          setPost(!post);
        }}
      >
        postttttttttttttttttttttttttttttttttttttttttttttttttttttttt
      </button>
      {post && (
        <Dialog
          open={post}
          onClose={() => {
            setPost(!post);
          }}
        >
          <DialogTitle style={{ marginBottom: "40px" }}>
            Create Project
          </DialogTitle>

          <DialogContent>
            <form
              onSubmit={(e) => {
                handlePost();
              }}
            >
              <TextField
                name="name"
                placeholder="projectName"
                //   onFocus={true}
                type="text"
                onChange={(e) => {
                  setpostname(e.target.value);
                }}
              />
              <Button
                type="submit"
                style={{ marginTop: "80px", marginRight: "20px" }}
              >
                submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ marginLeft: "15vw", width: "80vw" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">id</StyledTableCell>
              <StyledTableCell align="center">Project name</StyledTableCell>
              <StyledTableCell align="center">Team</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => {
              return (
                <Project
                  key={index}
                  name={project.name}
                  id={project.id}
                  // teamz={project.team[0].name}
                  //  team={project.team[1]}
                  teamz={project.team.map((teams, index) => {
                    return <div key={index}>{teams.name}</div>;
                  })}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

 
    </>
  );
};
export default Projects;


