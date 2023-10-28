import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Copmannuelle() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['2022', '2023'],
            datasets: [
                {
                    label: '2022',
                    data: [540, 0], // ici on met la donnée de 2022 pour l'étiquette 2022 et 0 pour 2023
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: '2023',
                    data: [0, 325], // ici on met 0 pour l'étiquette 2022 et la donnée de 2023 pour l'étiquette 2023
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card1">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        