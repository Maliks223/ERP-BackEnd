import React, { useEffect, useState } from "react";
import EmployeeCard from "../../components/employee-card/employeeCard";
import "./employee.css";


const Employees = () => {

  const [data, setData] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/employees');
      const res = await response.json();
      console.table(res);
      setData(res);
    }
    catch {
      console.log('error');
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);


  return (
    <>
      <h1>employees</h1>
      { data && 
        <EmployeeCard data={data} />
      }
    </>
  )
};
export default Employees;
