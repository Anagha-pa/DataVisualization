import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer'; 
import axios from 'axios';

const ExcelUploader = () => {
    const [data, setData] = useState([]);

    const sendData = async () => {
        try{
            const response = await axios.post("http://localhost:8000/api/dataupload/excel-data/", data,{
                headers:{
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200){
                console.log('Data set successfully');
            }else{
                console.log('Error :', response.statusText);
            } 
        }catch(error){
            console.log('Error sending data:',error.message);
        }
    };


    const handleFileUploader = (event) => {
        const file = event.target.files[0];

        ExcelRenderer(file, (err, result) => { 
            if (err) {
                console.log(err);
            } else {
                setData(result);
            }
        });
    };
  

    return (
        <div>
            <h1 className="text-3xl font-bold p-8">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">Upload file</label>
                <input
                    className="block w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={handleFileUploader}
                />
                <button
                    type="button"
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                    onClick={sendData}
                >Submit</button>
            </h1>
        </div>
    );
};

export default ExcelUploader;

