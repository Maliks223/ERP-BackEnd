import { Slider } from "@mui/material";
import React from "react";
import './kpiCard.css';


const KPICard = ({data}) => {
    const {kpi_name, rate, KPI_date} = data;
    return (
        <>
            <div className="kpiCard-container">
                <h3>{kpi_name}</h3>
                <Slider 
                    sx = {{color:"white", marginLeft:"24px", marginRight:"24px", width:"85%", marginTop:"36px"}}
                    aria-label="Rate"
                    defaultValue={rate}
                    valueLabelDisplay="on"
                    // step={5}
                    min={1}
                    max={10}
                    disabled
                    color="success"
                />
                <h3>Issued: {KPI_date.slice(0,10)}</h3>
            </div>
        </>
    )
}

export default KPICard;