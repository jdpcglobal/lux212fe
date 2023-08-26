import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';

const BankTransaction = () => {

    const [transactionData, setTransactionData] = useState([]);
    const token = new Cookies().get("kisDiamond_LoggedIn")?.Token;

    useEffect(() => {
        fetchBankTransactions();
    }, []);

    const fetchBankTransactions = async () => {
        try {
            const formData = new FormData();
            formData.append('Token', token);

            const response = await fetch('https://lux212.azurewebsites.net/Api/BankTransactions', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setTransactionData(jsonData.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <div id="BankTransaction" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="container">
                        <div className="d-flex pb-2">
                            <div className="align-self-center ms-auto">
                                <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10 offset-sm-1 " style={{ marginTop: '30px' }}>
                                <div className="align-self-center" style={{width:'16rem'}}>
                                    <h1 className="font-800 font-22 trn Title" data-trn-key="Deposit">Bank Transaction </h1>
                                </div>
                                <Table striped bordered hover variant="dark" className="table" >
                                    <tbody style={{ fontSize: 18, fontWeight: "bold" }}>
                                        {transactionData.map((transaction, index) => (
                                            <tr>
                                                <th scope="row"><p>{transaction.Id}</p></th>
                                                <th>
                                                    <p>Bank :{transaction.BankName} </p>
                                                    <p style={{ color: transaction.Type === "BankDr" ? "green" : "red" }}>
                                                        Amount: {transaction.Amount}
                                                    </p>
                                                </th>
                                                <td>
                                                    <p>{transaction.Type}</p>
                                                    <p>{transaction.Date}</p>
                                                </td>
                                                <td>
                                                    {transaction.Status === "Pending" ? (
                                                        <img
                                                            src="./imagies/sahil.png"
                                                            style={{ height: '50px', width: '100px' }}
                                                            alt="Pending"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="./imagies/approved.png"
                                                            style={{ height: '50px', width: '100px' }}
                                                            alt="Approved"
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankTransaction
