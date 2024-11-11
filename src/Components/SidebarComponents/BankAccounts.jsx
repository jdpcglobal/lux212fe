import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { callPostApi } from "../ApiCaller";
import { MyBankAccounts_Post } from "../ApiConst";
import { SaveBankAcc_Post } from '../ApiConst';
import './account.css'
const BankAccounts = () => {
    const [MyBank, setMyBank] = useState([]);
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const [drawCount, setDrawCount] = useState(0)

    const [BankName, setBankName] = useState("");
    const [AccNumber, setAccNumber] = useState("");
    const [HolderName, setHolderName] = useState("");
    const [showModalBox, setShowModalBox] = useState(false)
    const [hideButton, setHideButton] = useState(true)

    //***** MyBankAccount Api *****/
    const getData = () => {
        const formData = new FormData();
        formData.append("Token", loggedInUser?.Token);
        callPostApi(MyBankAccounts_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setMyBank(respObj.data);
            }
        })

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
    //***** MyBankAccount Api *****/


    //***** Save BankAccount *****//
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("BankName", BankName);
        formData.append("AccNumber", AccNumber);
        formData.append("HolderName", HolderName);
        formData.append("Token", loggedInUser?.Token);
        callPostApi(SaveBankAcc_Post, formData, jsonData => {
            setDrawCount(pre => pre + 1)
            setShowModalBox(false)
            setHideButton(true)
            // history("/read-bank");
        })
    };
    //***** Save BankAccount *****//

    function ShowModalBox() {
        setShowModalBox(true)
        setHideButton(false)
    }
    return (
        <>
           <div id="BankAccounts" className="offcanvas offcanvas-end bg-theme">
    <div className="content">
        <div className="d-flex pb-2 history1">
            <div className="align-self-center">
                <label className="font-800 font-22 Title">History</label>
            </div>
            <div className="align-self-center ms-auto">
                <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                    <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
                </a>
            </div>
        </div>

        {MyBank.length > 0 && MyBank.map((data, index) => (
            <form key={index} id="withdraw_form" name="withdraw_form" className="" method="post" style={{ marginBottom: '50px' }}>
                
                <div className="form-custom12">
                    <div className="BankAccountNames">Holder's Name</div>
                    <div className="BankAccountNames2">{data.HolderName}</div>
                </div>

                <div className="form-custom12">
                    <div className="BankAccountNames">Bank Name</div>
                    <div className="BankAccountNames2">{data.BankName}</div>
                </div>

                <div className="form-custom12">
                    <div className="BankAccountNames">Bank Account</div>
                    <div className="BankAccountNames2">{data.AccNumber}</div>
                </div>
                
                <hr />
            </form>
        ))}

        {showModalBox && (
            <>
                <div className="login-box" style={{ width: "100%" }}>
                    <form>
                        <div className="user-box">
                            <input type="text" required="" autoComplete='off' id="bankNameInput" name="bankName"
                                onChange={(e) => setBankName(e.target.value)} />
                            <label>Bank Name</label>
                        </div>
                        <div className="user-box">
                            <input type="text" required="" autoComplete='off' id="accountHolderInput" name="accountHolder"
                                onChange={(e) => setHolderName(e.target.value)} />
                            <label>Enter Account Holder's Name</label>
                        </div>
                        <div className="user-box">
                            <input type="number" required="" autoComplete='off' id="accountNoInput" name="accountNo"
                                onChange={(e) => setAccNumber(e.target.value)} />
                            <label>Account No</label>
                        </div>
                    </form>
                    <button className='btn btn-full gradient-green shadow-bg mt-4' style={{ width: "100%" }} onClick={handleSubmit}>Submit</button>
                </div>
            </>
        )}

        <center>
            {hideButton && (
                <button className="btn btn-full gradient-green shadow-bg mt-4" id="withdraw_btn_bank" style={{ width: "100%" }} onClick={ShowModalBox}>
                    Add Bank Account
                </button>
            )}
        </center>
    </div>
</div>

        </>
    )
}

export default BankAccounts
