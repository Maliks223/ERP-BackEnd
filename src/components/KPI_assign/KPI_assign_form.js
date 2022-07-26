import { Button, DialogActions, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";


const KPIAssignForm = (props) => {

    const [kpis, setKPIs] = useState([]);
    const [kpi, setKpi] = useState(0);
    const [rate, setRate] = useState(0);
    const [KPI_date, setKPIDate] = useState('');

    const handelKPIChange = (e) => {
        setKpi(e.target.value);
    }

    const handleRateChange = (e) => {
        setRate(e.target.value);
    }

    const handleDateChange = (e) => {
        setKPIDate(e.target.value);
    }

    const fetchKPIS = async () => {
        const response = await fetch(`http://localhost:8000/api/kpi`);
        const data = await response.json();
        setKPIs(data);
    }

    const handleAssign = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('employee_id', props.id);
        formData.append('kpi_id', kpi);
        formData.append('rate', rate);
        formData.append('KPI_date', KPI_date);
        try {
            const response = await fetch(
                `http://localhost:8000/api/employeekpi`, {
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

    useEffect(() => {
        fetchKPIS();
    }, []);

    return (
        <>
            <InputLabel sx={{marginLeft:"80px", marginBottom:"10px"}} >KPIs List</InputLabel>
            <Select
            sx={{width:"20vw", marginLeft:"80px"}}
                label='KPIs List'
                value={kpi}
                onChange={handelKPIChange}
            >
                {kpis.map(kpi => {
                    return (
                        <MenuItem value={kpi.id}>{kpi.name}</MenuItem>
                    )
                })}
            </Select>
            <Slider
            sx={{margin:"20px 0px 20px 0px"}}
                aria-label="Rate"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={handleRateChange}
            />
            <TextField
             sx={{width:"20vw", marginLeft:"80px", marginBottom:"26px"}}
                type='date'
                onChange={handleDateChange}
            />
            <DialogActions>
                <Button variant="contained" className="addEmployeeBtn" sx = {{backgroundColor:"var(--blue)", width:"8vw", margin:"auto"}} onClick={handleAssign}>Submit</Button>
            </DialogActions>
        </>
    )
}

export default KPIAssignForm;