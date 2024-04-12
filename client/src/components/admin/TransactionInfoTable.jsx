import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'


const TransactionInfoTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/transactionInfo');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h3>Transaction Information</h3>
            <div class="table-responsive">
                <table className='table p-4' >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Email of Student</th>
                            <th scope="col">Batch</th>
                            <th scope="col">Hash</th>
                            <th scope="col">Organization Name</th>
                            <th scope="col">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.emailOfStudent}</td>
                                <td>{item.batch}</td>
                                <td>{item.CID}</td>
                                <td>{item.organizationName}</td>
                                <td>{item.createdAt}</td>

                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransactionInfoTable