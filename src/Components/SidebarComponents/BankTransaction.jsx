import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'reactstrap';
import Cookies from 'universal-cookie';
import { callPostApi } from '../ApiCaller';
import { BankTransactions_Post } from '../ApiConst';

const BankTransaction = () => {

    const [transactionData, setTransactionData] = useState([]);
    const token = new Cookies().get("kisDiamond_LoggedIn")?.Token;

    useEffect(() => {
        fetchBankTransactions();
    }, []);

    const fetchBankTransactions = async () => {
        const formData = new FormData();
        formData.append('Token', token);
        callPostApi(BankTransactions_Post, formData, jsonData => {
            const respObj = jsonData.data;
            toast(respObj.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                setTransactionData(respObj.data);
            }
        })

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
                                <div className="align-self-center" style={{ width: '16rem' }}>
                                    <label className="font-800 font-22 trn Title" data-trn-key="Deposit">Bank Transaction </label>
                                </div>

                                {transactionData.map((transaction, index) => (
                                    <Table>
                                        <tbody style={{ fontSize: 15, fontWeight: "bold" }}>

                                            <tr>
                                                <th className="Th">
                                                    <p>Bank : {transaction.BankName} </p>
                                                    <p style={{ color: transaction.Type === "BankDr" ? "green" : "red" }}>
                                                        Amount: {transaction.Amount.toString().slice(0, 8)}
                                                        {transaction.Amount.toString().length > 8 ? "..." : ""}
                                                    </p>
                                                </th>
                                                <td className="Th">
                                                    <p>{transaction.Type}</p>
                                                    <p>{transaction.Date}</p>
                                                </td>
                                                <td className="Th">
                                                    {transaction.Status === "Pending" ? (
                                                        <div className='transactionStatus'>
                                                        <span className="pending">PENDING</span>
                                                    </div>
                                                    ) : (
                                                        <div className='transactionStatus'>
                                                            <span className="Approved">APPROVED</span>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BankTransaction
