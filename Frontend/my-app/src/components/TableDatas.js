import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TableDatas = () => {
    const [tableData, setTableData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/dataupload/table-representation/');
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  return (

    <div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    SR_NO
                </th>
                <th scope="col" class="px-6 py-3">
                    ITEM NAME
                </th>
                <th scope="col" class="px-6 py-3">
                    MRP PRICE
                </th>
                <th scope="col" class="px-6 py-3">
                    TOTAL STOCK
                </th>
                <th scope="col" class="px-6 py-3">
                    SOLD STOCK
                </th>
                <th scope="col" class="px-6 py-3">
                    TOTAL REVENUE
                </th>
            </tr>
        </thead>
        <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.sr_no}</td>
                <td className="px-6 py-4">{data.item_name}</td>
                <td className="px-6 py-4">{data.mrp_price}</td>
                <td className="px-6 py-4">{data.total_stock}</td>
                <td className="px-6 py-4">{data.sold_stock}</td>
                <td className="px-6 py-4">{data.total_revenue}</td>
              </tr>
            ))}
          </tbody>
    </table>
</div>
</div>
  )
}
