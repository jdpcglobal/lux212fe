import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    });
  };

  return (
    <>
      <div id="BankTransaction">
        <div className="title-section">
          <span>Bank Transaction</span>
        </div>
        {transactionData.map((transaction, index) => (
          <div key={index} className="transaction-table">
            <div className='border-row'>
            <div className="transaction-row ">
                
              <div className="label">Deposit:</div>
              <div className="value" style={{ color: transaction.Status === "Pending" ? "red" : "green" }}>
  {transaction.Status === "Pending" ? "PENDING" : "APPROVED"}
</div>
</div>
            </div>
            <div className="transaction-row">
              <div className="label">Balance:</div>
              <div className="value">${transaction.Amount}</div>
            </div>
            <div className="transaction-row">
              <div className="label">Date:</div>
              <div className="value">{transaction.Date}</div>
            </div>
            <div className="transaction-row">
              <div className="label">Type:</div>
              <div className="value">{transaction.Type}</div>
            </div>
            <div className="transaction-row">
              <div className="label">Bank Name:</div>
              <div className="value">{transaction.BankName}</div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default BankTransaction;
