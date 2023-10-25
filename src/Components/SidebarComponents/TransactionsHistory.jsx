import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { callPostApi } from '../ApiCaller';
import { Transactions_Post } from '../ApiConst';

const TransactionsHistory = () => {
    const [transaction, setTransaction] = useState('');

    useEffect(() => {
        Transactions()
    }, [])

    const Transactions = async () => {
        const token = new Cookies().get('kisDiamond_LoggedIn')?.Token;
        let formData = new FormData();
        formData.append('Token', token);
        callPostApi(Transactions_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setTransaction(respObj.data);
            }
        })

    };
    const goBack = () => {
        window.history.back();
    };
    return (
        <>
            <div className="card card-style mb-5 TransactionHistory">
                <span className='BackButton'>
                    <img onClick={goBack} width="54" height="54" src="https://img.icons8.com/sf-black-filled/64/circled-left-2.png" alt="circled-left-2" />
                </span>
                <div className="mt-1 mx-2 mb-3">
                    <div className="tabs tabs-borders" id="history-tab">
                        <div className="tab-controls">
                            <a
                                className="font-13"
                                data-bs-toggle="collapse"
                                href="#deposit"
                                aria-expanded="true"
                            >
                                Deposit
                            </a>
                            <a
                                className="font-13 collapsed"
                                data-bs-toggle="collapse"
                                href="#withdraw"
                                aria-expanded="false"
                            >
                                Withdraw
                            </a>
                            <a
                                className="font-13 collapsed"
                                data-bs-toggle="collapse"
                                href="#transfer"
                                aria-expanded="false"
                            >
                                Transfer
                            </a>
                        </div>
                        <div className="mt-3" />
                        <div
                            className="collapse show"
                            id="deposit"
                            data-bs-parent="#history-tab"
                            style={{}}
                        >
                            <div className="table-responsive">
                                <table className="table color-theme mb-2 font-11">
                                    <thead className='TransactionTable'>
                                        <tr>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Datetime"
                                            >
                                                Datetime
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Type"
                                            >
                                                Type
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Method"
                                            >
                                                Method
                                            </th>
                                            <th
                                                className="border-fade-blue text-center trn"
                                                scope="col"
                                                data-trn-key="Amount"
                                            >
                                                Amount
                                            </th>
                                            <th className="border-fade-blue" scope="col">
                                                <small className="trn" data-trn-key="Remark">
                                                    Remark
                                                </small>
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Status"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    {transaction.length > 0 && transaction
                                        .filter(data => data.Type === 'BetDr')
                                        .map((data, index) => (
                                            <tbody key={index}>
                                                <tr className="border-fade-blue">
                                                    <td>
                                                        <small>{data.Date}</small>
                                                    </td>
                                                    <td>
                                                        <small className="trn Deposit" data-trn-key="Deposit">
                                                            {data.Type}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small className=" ">{data.Type}</small>
                                                    </td>
                                                    <td>
                                                        <small>{(data.Amount).toFixed(2)}</small>
                                                    </td>
                                                    <td>
                                                        <small>REJECT</small>
                                                    </td>
                                                    <td className="text-center">

                                                        {data.status === 1 ? "green" : <i className="bi  bi-x-octagon color-red-dark" />}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }

                                </table>
                            </div>
                        </div>
                        <div
                            className="collapse"
                            id="withdraw"
                            data-bs-parent="#history-tab"
                            style={{}}
                        >
                            <div className="table-responsive">
                                <table className="table color-theme mb-2 font-11">
                                    <thead className='TransactionTable'>
                                        <tr>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Datetime"
                                            >
                                                Datetime
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Type"
                                            >
                                                Type
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Method"
                                            >
                                                Method
                                            </th>
                                            <th
                                                className="border-fade-blue text-center trn"
                                                scope="col"
                                                data-trn-key="Amount"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Remark"
                                            >
                                                Remark
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Status"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    {transaction.length > 0 && transaction
                                        .filter(data => data.Type === 'BankCr')
                                        .map((data, index) => (
                                            <tbody key={index}>
                                                <tr className="border-fade-blue">
                                                    <td>
                                                        <small>{data.Date}</small>
                                                    </td>
                                                    <td>
                                                        <small className="trn Deposit" data-trn-key="Deposit">
                                                            {data.Type}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small className=" ">{data.Type}</small>
                                                    </td>
                                                    <td>
                                                        <small>{(data.Amount).toFixed(2)}</small>
                                                    </td>
                                                    <td>
                                                        <small>REJECT</small>
                                                    </td>
                                                    <td className="text-center">
                                                        <i className="bi  bi-x-octagon color-red-dark" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                        <div
                            className="collapse"
                            id="transfer"
                            data-bs-parent="#history-tab"
                            style={{}}
                        >
                            <div className="table-responsive">
                                <table className="table color-theme mb-2 font-11">
                                    <thead className='TransactionTable'>
                                        <tr>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Datetime"
                                            >
                                                Datetime
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Type"
                                            >
                                                Type
                                            </th>
                                            <th
                                                className="border-fade-blue text-center trn"
                                                scope="col"
                                                data-trn-key="Amount"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Target/From"
                                            >
                                                Target/From
                                            </th>
                                            <th
                                                className="border-fade-blue trn"
                                                scope="col"
                                                data-trn-key="Status"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    {transaction.length > 0 && transaction
                                        .filter(data => data.Type === 'TrCr' || data.Type === 'TrDr')
                                        .map((data, index) => (
                                            <tbody key={index}>
                                                <tr className="border-fade-blue">
                                                    <td>
                                                        <small>{data.Date}</small>
                                                    </td>
                                                    <td>
                                                        <small className="trn Deposit" data-trn-key="Deposit">
                                                            {data.Type}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small className=" ">{data.Type}</small>
                                                    </td>
                                                    <td>
                                                        <small>{(data.Amount).toFixed(2)}</small>
                                                    </td>
                                                    <td>
                                                        <small>REJECT</small>
                                                    </td>
                                                    <td className="text-center">
                                                        <i className="bi  bi-x-octagon color-red-dark" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TransactionsHistory
