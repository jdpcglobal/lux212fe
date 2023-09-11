import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
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
            <Modal.Body>
                <div className="container w-100%">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="login-box">
                                    <h2>Change Phone</h2>
                                    <form>
                                        <div className="user-box">
                                            <input type="text" required="" autoComplete='off' id="bankNameInput" name="bankName"
                                                onChange={(e) => setBankName(e.target.value)} />
                                            <label>Select Bank</label>
                                        </div>
                                        <div className="user-box">
                                            <input type="text" required="" autoComplete='off'
                                                id="accountHolderInput" name="accountHolder"
                                                onChange={(e) => setAccNumber(e.target.value)} />
                                            <label>Enter Account Holder's Name</label>
                                        </div>
                                        <div className="user-box">
                                            <input type="number" required="" autoComplete='off'
                                                id="accountNoInput" name="accountNo"
                                                onChange={(e) => setHolderName(e.target.value)} />
                                            <label>Account No</label>
                                        </div>

                                            <Button outline color='success' onClick={handleSubmit}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CreateBankAcc
