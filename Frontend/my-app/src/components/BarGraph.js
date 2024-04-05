import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';




const BarGraph = () => {

    const [graphData, setGraphData] = useState({});

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:8000/api/dataupload/bar-graph-data/');
                const data = response.data;
                const labels = data.map(item => item.item_name);
                const values = data.map(item => item.sold_stock);
                
                setGraphData({
                    labels:labels,
                    datasets:[{
                        label :'Sold Stock',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,

                    },
                ],

                });
                 
            }catch(error){
                console.error('Error', error);
            }
        };
        fetchData();
    }, []);


  return (
    <div>
        <h2>Bar Graph Representation</h2>
        <Bar data={graphData}/>
    </div>
  )
}
export default BarGraph;
