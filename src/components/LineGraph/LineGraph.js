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
                    labels: kpis.map((employee) => employee.KPI_date.slice(0, 10)),
                    datasets: [
                        {
                            label: "Rate",
                            data: kpis.map((employee) => employee.rate),
                            backgroundColor: [
                                "#013B75"
                            ]
                        }
                    ]
                }} options={{
                    responsive: true,
                    scales: {
                        x: {
                            ticks: {
                                color: 'black'
                            }
                        },
                        y: {
                            // max: 10,
                            ticks: {
                                color: 'black'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            color: 'black',
                            text: kpis[0].kpi_name,
                            font: {
                                size: 20,
                            }
                        },
                    }
                }
                } />
            </div>
        </>
    )
}

export default BarCharts;