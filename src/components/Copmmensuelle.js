import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import TotalRevenuService from '../services/TotalRevenuService';

export default function Copmmensuelles() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {

        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

        const dataSet = buildDataset();
        
        TotalRevenuService.findByYear(currentYear).then(data => {
            dataSet.labels = data.months.map(m => m.month);
            dataSet.datasets[0].data = data.months.map(m => m.amount);
            TotalRevenuService.findByYear(previousYear).then(data => {
                dataSet.datasets[1].data = data.months.map(m => m.amount);
                setChartData(dataSet);
            });
        });


        setChartOptions(buildOptions);
    }, []);

    const buildOptions = () => {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const result = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        return result;
    }

    const buildDataset = () => {

        const documentStyle = getComputedStyle(document.documentElement);

        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        const result = {
            labels: [],
            datasets: [
                {
                    label: previousYear.toString(),
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: []
                },
                {
                    label: currentYear.toString(),
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: []
                }
            ]
        };
        // result.labels = data.months.map(m => m.month);
        // result.datasets[0].data = data.months.map(m => m.amount);
        // result.datasets[1].data = data.months.map(m => m.amount);
        return result;
    }

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        