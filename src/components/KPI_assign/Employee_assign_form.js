import { Button, DialogActions, InputLabel, MenuItem, Select, Slider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";


const EmployeeAssignForm = (props) => {

    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(0);
    const [rate, setRate] = useState(0);
    const [KPI_date, setKPIDate] = useState('');


    const handleEmployeeChange = (e) => {
        setEmployee(e.target.value);
    }

    const handleRateChange = (e) => {
        setRate(e.target.value);
    }

    const handleDateChange = (e) => {
        setKPIDate(e.target.value);
    }

    const fetchEmployees = async () => {
        const response = await fetch(`http://localhost:8000/api/employees`)
        const data = await response.json();
        setEmployees(data)
    }

    const handleAssign = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('employee_id', employee);
        formData.append('kpi_id', props.id);
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
        fetchEmployees();
    }, []);

    return (
        <>
            <InputLabel>Employees List</InputLabel>
            <Select
                label='Employees List'
                value={employee}
                onChange={handleEmployeeChange}
            >
                {employees.map(employee => {
                    return (
                        <MenuItem value={employee.id}>{employee.firstname}{" "}{employee.lastname}</MenuItem>
                    )
                })}
            </Select>
            <Slider
                aria-label="Rate"
                defaultValue={0}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={handleRateChange}
            />
            <TextField
                type='date'
                onChange={handleDateChange}
            />
            <DialogActions>
                <Button onClick={handleAssign}>Submit</Button>
            </DialogActions>
        </>
    )
}

export default EmployeeAssignForm;