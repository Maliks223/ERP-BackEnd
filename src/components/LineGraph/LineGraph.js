import "./lineGraph.css";
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarCharts = (props) => {
    const kpis = props.kpis;
    return (
        <>
            <div className='line-graph'>
                <Bar data={{
                    labels: kpis.map((employee) => employee.pivot.KPI_date),
                    datasets: [
                        {
                            label: "Rate",
                            data: kpis.map((employee) => employee.pivot.rate),
                            backgroundColor: [
                                "#ffbb11",
                                "#ecf0f1",
                                "#50AF95",
                                "#f3ba2f",
                                "#2a71d0"
                            ]
                        }
                    ]
                }} options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Chart.js Line Chart',
                        },
                    },
                }} />
            </div>
        </>
    )
}

export default BarCharts;