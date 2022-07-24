import { Slider } from "@mui/material";
import React from "react";
import './kpiCard.css';


const KPICard = (props) => {

    return (
        <>
            <div className="kpiCard-container">
                <h3>{props.title}</h3>
                <Slider 

                    aria-label="Rate"
                    defaultValue={props.rate}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
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