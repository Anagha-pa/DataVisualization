import React, { useState } from 'react';
import axios from 'axios';

const ExcelUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileUploader = (event) => {
        setFile(event.target.files[0]);
    };


    const sendData = async (event) => {
        event.preventDefault()

        if (!file) {
            setMessage('Plz select a file')
            return;
        }
        const formData = new FormData();
        formData.append('myfile',file);
        try{
            const response = await axios.post("http://localhost:8000/api/dataupload/data-upload/", formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            setMessage(response.data);
        }catch(error){
            setMessage('Error uploading file');
            console.log('Error',error);
        }
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default ExcelUploader;

