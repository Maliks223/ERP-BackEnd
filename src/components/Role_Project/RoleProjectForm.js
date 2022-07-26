import React, { useEffect, useState } from "react";
import {
  Button,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";

const RoleProject = (props) => {
  const [projects, setProjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [project, setProject] = useState(0);
  const [role, setRole] = useState(0);

  const handelProjectChange = (e) => {
    setProject(e.target.value);
  };

  const handelRoleChange = (e) => {
    setRole(e.target.value);
  };

  console.log("id", props.team.id);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/teams/${props.team.id}`
      );
      const data = await response.json();
      setProjects(data[0].projects);
    } catch (err) {
      console.log("err", err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/roles`);
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleAssign = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("employee_id", props.id);
    formData.append("role_id", role);
    formData.append("project_id", project);
    try {
      const response = await fetch(`http://localhost:8000/api/employeerole`, {
        method: "POST",
        content: "application/json",
        body: formData,
      });
      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchRoles();
  }, []);

  return (
    <>
      <InputLabel sx={{ width: "10vw", marginLeft: "60px", marginBottom: "10px" }}>
        Projects List
      </InputLabel>
      <Select
        sx={{ width: "15vw", marginLeft: "55px", marginBottom: "50px" }}
        label="Projects List"
        value={project}
        onChange={handelProjectChange}
      >
        {projects.map((project) => {
          return <MenuItem value={project.id}>{project.name}</MenuItem>;
        })}
      </Select>
      <InputLabel sx={{ width: "10vw", marginLeft: "60px", marginBottom: "10px" }}>
        Roles List
      </InputLabel>
      <Select
        label="Roles List"
        value={role}
        onChange={handelRoleChange}
        sx={{ width: "15vw", marginLeft: "55px", marginBttom: "50px" }}
      >
        {roles.map((role) => {
          return <MenuItem value={role.id}>{role.role}</MenuItem>;
        })}
      </Select>
      <DialogActions>
        <Button
          variant="contained"
          className="addEmployeeBtn"
          sx={{
            backgroundColor: "var(--blue)",
            width: "8vw",
            marginRight: "100px",
            marginTop: "40px",
          }}
          onClick={handleAssign}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
};
export default RoleProject;
