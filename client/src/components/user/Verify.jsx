import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ethers } from 'ethers';
import abi from '../../contractJson/IPFSHashStorage.json'
import abi2 from '../../contractJson/payme.json'

//0x90e5DEEe186D79c254c19de2964a5C5B1f9EaFef
const paymeAddr = '0xB6A199c4Ed5d7Ec5461c229C5A7c80FD40f48743'
const Address = '0xcafDfC95e5E55c3a75376EA734799201f9Bb93B2'

const Verify = () => {
    const [account, setAccount] = useState('Not connected')
    const contractAddres = Address
    const paymeAddress = paymeAddr
    const contractABI = abi.abi
    const paymentABI = abi2.abi

    const [result1, setResult1] = useState('');

    const [state, setState] = useState({
        Name: "",
        email: "",
        emailOfStudent: "",
        batch: "",
        CID: "",
        organizationName: ""
    });

    const [stateAcc, setStateAcc] = useState({
        provider: null,
        signer: null,
        contract: null
    })

    const [statepayment, setStatepayment] = useState({
        provider: null,
        signer: null,
        contract: null
    })

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [formValues, setFormValues] = useState(state);
    const [present, setPresent] = useState('')
    const [added, setAdded] = useState('')
    const [error, setError] = useState('')
    const [isChecked, setIsChecked] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setIsChecked(e.target.checked)
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

                const contractPayme = new ethers.Contract(
                    paymeAddress,
                    paymentABI,
                    signer
                )

                console.log(contract)
                console.log(contractPayme)
                setStateAcc({ provider, signer, contract });
                console.log(account)

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

        if (!values.emailOfStudent) {
            errors.emailOfStudent = "Email is required!";
        } else if (!regex.test(values.emailOfStudent)) {
            errors.emailOfStudent = "This is not a valid email format!";
        }

        if (!values.batch) {
            errors.batch = "Batch is required!";
        } else if (!batchRegex.test(values.batch)) {
            errors.batch = "Batch must contain only numbers!";
        }

        if (!values.CID) {
            errors.CID = "Please input 16 digit Hash";
        } else if (values.CID.length !== 15) {
            errors.CID = "length of hash should be 16 characters only"
        }

        if (!values.organizationName) {
            errors.organizationName = "Organiztion name is required!";
        }

        if (!isChecked) {
            errors.checkError = "Please agree to the terms and conditions.";
        }
        return errors;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        console.log(formValues)

        const contractReadingIPFS = new ethers.Contract(
            contractAddres,
            contractABI,
            stateAcc.signer
        )

        const contractPayment = new ethers.Contract(
            paymeAddress,
            paymentABI,
            stateAcc.signer
        )

        const read = async () => {
            try {
                if (contractReadingIPFS) {
                    const result = await contractReadingIPFS.hashExists(formValues.CID)
                    console.log(result);
                    if (result) {

                        const amount = 50
                        const wei = 279046169
                        const value = { value: wei}
                        const payment = await contractPayment.fund(amount, value)
                        const receipt = await payment.wait();
                        if (receipt.status === 1) {
                            console.log("Function executed successfully.");
                            window.open(`https://gateway.pinata.cloud/ipfs/${formValues.CID}`, "_blank")

                            const postData = {
                                "name": formValues.Name,
                                "email": formValues.email,
                                "emailOfStudent": formValues.emailOfStudent,
                                "batch": formValues.batch,
                                "CID": formValues.CID,
                                "organizationName": formValues.organizationName
                            }
                            const response = await axios.post('http://localhost:5001/transactionInfo', postData);
                            console.log('Response:', response.data);

                            window.open(`https://gateway.pinata.cloud/ipfs/${formValues.CID}`, "_blank")
                        }
                        else {
                            console.log('not found')
                            setResult1("not found")
                        }

                    } else {
                        console.log("Function execution failed.");
                    }

                }

            } catch (error) {
                console.log(error)
            }

        }
        read()
        console.log(result1)
    }

    return (
        <>
            <div>

                <div className='container border border-black rounded p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="name" className="form-label">Name of The Verifier</label>
                            <input type="text"
                                name="Name"
                                className="form-control"
                                placeholder="Enter Student Name"
                                value={formValues.Name}
                                onChange={handleChange} />
                            <p>{formErrors.name}</p>
                        </div>

                        <div className="mb-3">
                            <label for="email" className="form-label">Email Address of Verifier</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <p>{formErrors.email}</p>
                        </div>

                        <div className="mb-3">
                            <label for="emailOfStudent" className="form-label">Email Address of Student</label>
                            <input
                                type="text"
                                className="form-control"
                                name="emailOfStudent"
                                placeholder="Email Of Student"
                                value={formValues.emailOfStudent}
                                onChange={handleChange}
                            />
                            <p>{formErrors.emailOfStudent}</p>
                        </div>

                        <div className="mb-3">
                            <label for="batch" className="form-label">Batch of Student</label>
                            <input
                                type="text"
                                className="form-control"
                                name="batch"
                                placeholder="Batch"
                                value={formValues.batch}
                                onChange={handleChange}
                            />
                            <p>{formErrors.batch}</p>
                            <div id="batch" className="form-text">batch year is year of graduation.</div>
                        </div>

                        <div className="mb-3">
                            <label for="CID" className="form-label">CID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="CID"
                                placeholder="Enter the CID (hash) recieved from the student"
                                value={formValues.CID}
                                onChange={handleChange}
                            />
                            <p>{formErrors.CID}</p>
                        </div>

                        <div className="mb-3">
                            <label for="organizationName" className="form-label">Name of the Organization</label>
                            <input
                                type="text"
                                className="form-control"
                                name="organizationName"
                                placeholder="Name of the college of University"
                                value={formValues.organizationName}
                                onChange={handleChange}
                            />
                            <p>{formErrors.organizationName}</p>
                            <div className="form-text">Please write name of the university or college</div>
                        </div>

                        <div className="mb-3 form-check">
                            <label htmlFor="checkbox" className="form-label">you agree to pay the amount required for this process through Ethereum</label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                            />
                            <p>{formErrors.checkError}</p>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        <p>{present}</p>
                        <p>{added}</p>
                        <p>{error}</p>
                    </form>
                </div>
                <p>result1</p>
            </div>
        </>
    )
}

export default Verify