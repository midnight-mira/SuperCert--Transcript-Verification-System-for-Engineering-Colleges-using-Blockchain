import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers';
import abi from '../../contractJson/IPFSHashStorage.json'
import { useNavigate } from 'react-router-dom'
//0x90e5DEEe186D79c254c19de2964a5C5B1f9EaFef
//0xcafDfC95e5E55c3a75376EA734799201f9Bb93B2
const Address = 'your testnet address where IPFSHashStorage contract is deployed'
const AddDocument = () => {
    const navigate = useNavigate()
    const [stateAcc, setStateAcc] = useState({
        provider: null,
        signer: null,
        contract: null
    })
    const [account, setAccount] = useState('Not connected')
    const contractAddres = Address
    const contractABI = abi.abi

    const [present, setPresent] = useState('')
    const [added, setAdded] = useState('')
    const [error, setError] = useState('')

    const [state, setState] = useState({
        Name: "",
        email: "",
        batch: "",
        dept: "",
        Document: null,
    });

    const [formErrors, setFormErrors] = useState({});

    const [isSubmit, setIsSubmit] = useState(false);

    const [formValues, setFormValues] = useState(state);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "file") {
            setFormValues({ ...formValues, [name]: e.target.files[0] });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    useEffect(() => {
        // console.log(formErrors);
    }, [formErrors]);

    useEffect(() => {
        const template = async () => {
            const contractAddres = Address
            const contractABI = abi.abi;
            try {

                const { ethereum } = window;
                const account = await ethereum.request({
                    method: "eth_requestAccounts"
                })

                window.ethereum.on("accountsChanged", () => {
                    window.location.reload()
                })
                setAccount(account);
                const provider = new ethers.BrowserProvider(window.ethereum) //read the Blockchain
                const signer = await provider.getSigner(); //write the blockchain

                const contract = new ethers.Contract(
                    contractAddres,
                    contractABI,
                    signer
                )
                console.log(contract)
                setStateAcc({ provider, signer, contract });

            } catch (error) {
                console.log(error)
            }
        }
        template();


    }, [])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const batchRegex = /^[0-9]+$/; // Regular expression for numbers only
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!values.Name) {
            errors.Name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.batch) {
            errors.batch = "Batch is required!";
        } else if (!batchRegex.test(values.batch)) {
            errors.batch = "Batch must contain only numbers!";
        }

        if (!values.dept) {
            errors.dept = "Department is required!";
        }

        if (!values.Document) {
            errors.Document = "File is required!";
        } else if (values.Document.size > maxSize) {
            errors.Document = "File size should be less than 10MB!";
        } else if (!values.Document.name.endsWith('.pdf')) {
            errors.Document = "File should be a PDF!";
        }
        return errors;


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        console.log(formValues)

        try {
            if (!formValues.Document) {
                console.log('empty file')
            }
            const data = new FormData()
            data.append("name", formValues.Name)
            data.append("file", formValues.Document)

            const response = await axios.post('http://localhost:5001/ipfsDocs', data);
            console.log('Response:', response.data);
            const datatemp = response.data
            console.log(datatemp)

            const contract = new ethers.Contract(
                contractAddres,
                contractABI,
                stateAcc.signer
            )

            const read = async () => {
                try {
                    if (contract) {
                        const result = await contract.hashExists(datatemp)
                        console.log('done')
                        console.log(result);

                        if (result == true) {
                            console.log("there")
                            setPresent("Already in Blockchain")
                        }

                        else {

                            const add = await contract.storeHash(datatemp)
                            console.log('Trasaction sent', add.hash)
                            if (add.hash) {

                                const postData = {
                                    "name": formValues.Name,
                                    "email": formValues.email,
                                    "batch": formValues.batch,
                                    "dept": formValues.dept,
                                    "CID": datatemp
                                }

                                const email ={
                                    "email": formValues.email,
                                    "hash": datatemp
                                }

                                const sendEmail = await axios.post('http://localhost:5001/ipfsDocs/sendemail', email);
                                console.log('Response:',sendEmail.data);
                                alert("Email Sent Successfully")

                                const response = await axios.post('http://localhost:5001/studentInfo', postData);
                                console.log('Response:', response.data);

                            }
                            console.log("Added succesfully")
                            setAdded("Added to Blockchain Successfully")
                            navigate("/admin")

                            /*
                            const transaction = () => {

                                try {
                                    if (contract) {
                                        const add = contract.storeHash(datatemp)
                                        console.log('Transaction sent:', tx.hash);

                                        // Wait for transaction receipt
                                        const receipt = await provider.waitForTransaction(tx.hash);

                                        // Check transaction status
                                        if (receipt.status === 1) {
                                            console.log('Transaction successful!');
                                        } else {
                                            console.log('Transaction failed!');
                                        }

                                        if (done == true) {
                                            setAdded("Successfully Added")
                                        }
                                    }

                                } catch (error) {
                                    console.log(error)
                                    setError("Transaction Failed")
                                }

                            }*/

                            //transaction()
                        }
                    }

                } catch (error) {
                    console.log(error)
                    setError('Transaction Rejected')
                    alert(error)
                    /*const timeout = setTimeout(() => {
                        window.location.reload(); // Reload the page after the specified timeout
                    }, 3000);*/
                }

            }
            read()


        } catch (error) {
            console.error('Error:', error);
            alert(error)
        }
    }

    return (
        <div className='container border border-black rounded p-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Full Name of Student</label>
                    <input type="text"
                        name="Name"
                        class="form-control"
                        placeholder="Enter Student Name"
                        value={formValues.name}
                        onChange={handleChange} />
                    <p>{formErrors.name}</p>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">Email Address of Student</label>
                    <input
                        type="text"
                        class="form-control"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <p>{formErrors.email}</p>
                </div>

                <div className="mb-3">
                    <label for="batch" className="form-label">Batch of Student</label>
                    <input
                        type="text"
                        class="form-control"
                        name="batch"
                        placeholder="Batch"
                        value={formValues.batch}
                        onChange={handleChange}
                    />
                    <p>{formErrors.batch}</p>
                    <div id="batch" class="form-text">batch year is year of graduation.</div>
                </div>

                <div className="mb-3">
                    <label for="dept" className="form-label">Department of Student</label>
                    <input
                        type="text"
                        class="form-control"
                        name="dept"
                        placeholder="Batch"
                        value={formValues.dept}
                        onChange={handleChange}
                    />
                    <p>{formErrors.dept}</p>
                </div>

                <div class="mb-3">
                    <label for="formFile" className="form-label">Transacript File</label>
                    <input
                        type="file"
                        class="form-control"
                        name="Document"
                        accept=".pdf"
                        onChange={handleChange}
                    />
                    <p>{formErrors.Document}</p>
                    <div id="formfile" class="form-text">All semester transacripts compiled in 1 pdf no more than 10MB</div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <p>{present}</p>
                <p>{added}</p>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default AddDocument
