import { Button, Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const CreateBankAcc = ({ show, close, setDrawCount }) => {
    const [BankName, setBankName] = useState("");
    const [AccNumber, setAccNumber] = useState("");
    const [HolderName, setHolderName] = useState("");
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")

    const history = useNavigate();

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("BankName", BankName);
        formData.append("AccNumber", AccNumber);
        formData.append("HolderName", HolderName);
        formData.append("Token", loggedInUser?.Token);

        fetch("https://lux212.azurewebsites.net/Api/SaveBankAcc", {
            method: "POST",
            body: formData,
        })
            .then(() => {
                setDrawCount(pre => pre + 1)
                // history("/read-bank");
                close();
            });
    };

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Add Bank Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container w-100%">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="bankNameInput" className="form-label">
                                            Select Bank
                                        </label>
                                        <input type="text" autoComplete="off" className=" form-control"
                                            id="bankNameInput" name="bankName"
                                            onChange={(e) => setBankName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="accountHolderInput" className="form-label">
                                            Enter Account Holder's Name
                                        </label>
                                        <input type="text" autoComplete="off" className="form-control"
                                            id="accountHolderInput" name="accountHolder"
                                            onChange={(e) => setAccNumber(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="accountNoInput" className="form-label">
                                            Account No
                                        </label>
                                        <input
                                            type="number" autoComplete="off" className="form-control" id="accountNoInput" name="accountNo"
                                            onChange={(e) => setHolderName(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBankAcc
