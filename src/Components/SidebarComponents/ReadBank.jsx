import React, { useEffect, useState } from "react";
import Sidebar from '../Sidebar';
import Cookies from 'universal-cookie';
import CreateBankAcc from "./CreateBankAcc";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'reactstrap';
import Table from 'react-bootstrap/Table';


const ReadBank = () => {
    const [MyBank, setMyBank] = useState([]);
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const [drawCount, setDrawCount] = useState(0)

    const getData = () => {
        const formData = new FormData();
        formData.append("Token", loggedInUser?.Token);

        fetch("https://lux212.azurewebsites.net/Api/MyBankAccounts", {
            method: "POST",

            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                return response.json();
            })
            .then((data) => {
                if (data.isSuccess) {
                    setMyBank(data.data);
                }
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    //done
    useEffect(() => {
        getData();
    }, [drawCount]);


    //modal box 
    const [CreateBankAccModal, setCreateBankAccModal] = useState(false)
    const cookiesData = new Cookies().get("kisDiamond_LoggedIn");

    const toggleCreateBankAccModal = () => {
        setCreateBankAccModal(false)
    }

    return (
        <>
            <div id="ReadBank" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">

                    <div className="container w-100">
                    <div className="d-flex pb-2">
                                        <div className="align-self-center ms-auto">
                                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                                        </div>
                                    </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Sidebar />
                            </div>
                                    
                            <div className="col-lg-4 offset-sm-1 Roman">
                                <div className="row ReadBankCard">
                                    <div className="d-flex justify-content-between m-2 Title" style={{ width: '15rem' }}>
                                        <h2 className="selectBank ">Bank Accounts</h2>
                                    </div>

                                    {MyBank.length > 0 && MyBank.map((data) =>
                                        <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>

                                                <th>Bank Name :  {data.BankName}</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>Acc Number : {data.HolderName}</td>
                                               
                                                <td>{
                                                    data.Status === 1 ? <img width="48" height="48" src="https://img.icons8.com/emoji/48/check-mark-button-emoji.png" alt="check-mark-button-emoji" /> : <img width="48" height="48" src="https://img.icons8.com/color/48/close-window.png" alt="close-window" />
                                                }</td>
                                            </tr>
                                            <tr>

                                                <td>Holder Name:{data.AccNumber}</td>
                                                
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    )}

                                    

                                    <div className="button">
                                        <Button outline color="warning" onClick={() => setCreateBankAccModal(true)}>
                                            Setup New Bank Account
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <CreateBankAcc show={CreateBankAccModal} setDrawCount={setDrawCount} close={toggleCreateBankAccModal} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReadBank;