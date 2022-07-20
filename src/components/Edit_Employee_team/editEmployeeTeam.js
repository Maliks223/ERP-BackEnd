import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";



const EditEmployeeTeam = ({ data }) => {

    const [teamsfetch, setTeams] = useState([]);
    const [teamId, setTeamId] = useState(0);

    const { id, teams } = data;

    const handleTeamChange = (e) => {
        setTeamId(e.target.value);
    }

    const handleEditTeam = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('team_id', teamId);
        formData.append("_method", "PUT");
        try {
            const response = await fetch(
                `http://localhost:8000/api/employees/${id}`, {
                method: "POST",
                content: "application/json",
                body: formData
            });
            const res = await response.json();
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchTeams = async () => {
        const response = await fetch(`http://localhost:8000/api/teams`)
        const data = await response.json();
        setTeams(data);

    }

    useEffect(() => {
        fetchTeams();
    }, [])

    return (
        <>
            {teams &&
                <p>Current Team: {teams.name}
                    {' '}Wanna Change Team?</p>
            }
            <InputLabel>Teams List</InputLabel>
            <Select
                label='Teams List'
                value={teamId}
                onChange={handleTeamChange}
            >
                {teamsfetch && teamsfetch.map(team => {
                    return (
                        <MenuItem value={team.id}>{team.name}</MenuItem>
                    )
                })}
            </Select>
            <DialogActions>
                <Button onClick={handleEditTeam}>Edit</Button>
            </DialogActions>
        </>
    )


}
export default EditEmployeeTeam;