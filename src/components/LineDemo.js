import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import DepartmentService from '../services/DepartmentService';

export default function LineDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [departments, setDepartments] = useState([]);
    

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
       
        DepartmentService.findAll().then(data => {
            setDepartments(data);

            const departmentNames = data.map(dept => dept.name);
            
            const updatedData = {
                labels: departmentNames,
                datasets: [
                    {
                        label: '2022',
                       // data: new Array(departmentNames.length).fill(0), // Initialisez les données à 0
                       data: [65, 59, 80, 81, 56, 55, 40,20, 80, 81, 56, 55, 40,25,52,34,16,62,42,35,52],
                        fill: false,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                        tension: 0.4
                    },
                    {
                        label: '2023',
                        //data: new Array(departmentNames.length).fill(0), // Initialisez les données à 0
                        data: [28, 48, 40, 19, 86, 27, 90,56, 55, 40,20, 80,20,25,36,52,63,41,24,15,89,],
                        fill: false,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
                        tension: 0.4
                    }
                ]
            };
            setChartData(updatedData);
        });

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
