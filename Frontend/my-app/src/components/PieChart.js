import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Pie} from 'react-chartjs-2';


const PieChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get("http://localhost:8000/api/dataupload/graph-data/");
                const data = response.data;

                const labels = data.map(item => item.item_name);
                const values = data.map(item => item.sold_stock);
                const colors = generateRandomColors(data.length);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: colors,
                        },
                    ],
                    total_revenue: data.map(item => item.total_revenue) // Add total revenue data
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const generateRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`);
        }
        return colors;
    };

    const options = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const total = dataset.data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = Math.floor((currentValue / total) * 100);
                    return `${data.labels[tooltipItem.index]}: ${percentage}% Sold, Total Revenue: $${data.total_revenue[tooltipItem.index]}`;
                }
            }
        }
    };


    return (
        <div>
            <h2>Pie Chart Representation</h2>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;