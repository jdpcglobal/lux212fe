import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { callPostApi } from "../ApiCaller";
import { MyBankAccounts_Post } from "../ApiConst";
import { SaveBankAcc_Post } from '../ApiConst';
import './bank.css'
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
                <div className="content" >
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <label className="font-800 font-22 trn Title" data-trn-key="History">
                                History
                            </label>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
                            </a>
                        </div>
                    </div>
                    <style
                        media="screen"
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n    .history td{\n      line-height: 15px;\n      text-align: center;\n      vertical-align: middle;\n      padding-left: 2px;\n      padding-right:2px;\n    }\n    .history th{\n      padding-left: 2px;\n      padding-right:2px;\n      text-align: center;\n\n    }\n    .Deposit {\n      color:#60ADFF;\n    }\n    .Withdraw {\n      color:#FF4B23;\n    }\n    .Rebate{\n      color:#8CC152;\n    }\n    "
                        }}
                    />


                    {MyBank.length > 0 && MyBank.map((data) =>
                        <form
                            id="withdraw_form"
                            name="withdraw_form"
                            className=""
                            action=""
                            encType="multipart/form-data"
                            onsubmit="if (!window.__cfRLUnblockHandlers) return false; withdraw_submit(this)"
                            method="post"
                            style={{ marginBottom: '50px' }}
                        >

                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent BankAccountShadow">
                                <i className="bi bi-envelope-fill font-13" />
                                <div className='BankAccountNames'>Holder's Name</div>
                                <div className='BankAccountNames2'>{data.HolderName}</div>
                            </div>

                            <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                                <i class="bi bi-bank2 font-13"></i>
                                <div
                                    className="form-select rounded-xs "
                                    id="withdraw_bank"
                                    name="bank"
                                    fdprocessedid="7dalh6"
                                >
                                    <div className='BankAccountName'>Bank Name</div>
                                    <div className='BankAccountName2'>{data.BankName}</div>
                                </div>
                            </div>

                            <div className="form-custom mb-3 form-icon form-floating form-border bg-transparent BankAccountShadow">
                                <i class="bi bi-person-circle font-13"></i>
                                <div className='BankAccountNames'>Bank Account</div>
                                <div className='BankAccountNames2'>{data.AccNumber}</div>
                            </div>
<hr/>
                        </form>
                    )}

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
                                        <input type="text" required="" autoComplete='off'
                                            id="accountHolderInput" name="accountHolder"
                                            onChange={(e) => setHolderName(e.target.value)} />
                                        <label>Enter Account Holder's Name</label>
                                    </div>
                                    <div className="user-box">
                                        <input type="number" required="" autoComplete='off'
                                            id="accountNoInput" name="accountNo"
                                            onChange={(e) => setAccNumber(e.target.value)} />
                                        <label>Account No</label>
                                    </div>
                                </form>
                                <button className='btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn' style={{ width: "100%" }} onClick={handleSubmit}>Submit</button>
                            </div>
                        </>

                    )}


                    <center>
                        {hideButton && (
                            <button
                                className="btn btn-full gradient-green shadow-bg shadow-bg-s mt-4 trn"
                                id="withdraw_btn_bank"
                                style={{ width: "100%" }}
                                data-trn-key="Submit"
                                fdprocessedid="l16osf"
                                onClick={ShowModalBox}
                            >
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
