import { Slider } from "@mui/material";
import React from "react";
import './kpiCard.css';


const KPICard = (props) => {

    return (
        <>
            <div className="kpiCard-container">
                <h3>{props.title}</h3>
                <Slider 
                    sx = {{color:"white", marginLeft:"24px", marginRight:"24px", width:"85%", marginTop:"36px"}}
                    aria-label="Rate"
                    defaultValue={props.rate}
                    valueLabelDisplay="on"
                    // step={5}
                    min={1}
                    max={10}
                    disabled
                    color="success"
                />
            </div>
        </>
    )
}

export default KPICard;