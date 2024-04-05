// Heatmap.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Heatmap = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dataupload/graph-data/');
                const itemsData = response.data;

                const itemNames = itemsData.map(item => item.item_name);
                const percentageSold = itemsData.map(item => (item.sold_stock / item.total_stock) * 100);
                const totalRevenue = itemsData.map(item => item.total_revenue);

                const z = [
                    percentageSold,
                    totalRevenue,
                ];

                const text = itemsData.map((item, index) => `${item.item_name}: 
                    Percentage of Total Sold Item: ${percentageSold[index]}%, 
                    Total Revenue: ${totalRevenue[index]}`);

                setData({
                    x: itemNames,
                    y: ['Percentage of Total sold item', 'Total Revenue'],
                    z: z,
                    type: 'heatmap',
                    text: text,
                    hoverinfo: 'text',
                    colorscale: 'Viridis', 
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Heatmap Chart Representation</h2>
            <Plot
                data={[data]}
                layout={{ width: 800, height: 400, title: 'Heatmap Chart' }}
            />
        </div>
    );
};

export default Heatmap;
