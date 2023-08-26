import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button} from 'reactstrap';
const WithdrawModal = () => {

    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const [MyBank, setMyBank] = useState([]);
    const [debitDetail, setDebitDetails] = useState({
        Amount: "",
        UserId: "",
        DestBankId: "",
    })
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('')


    //***** READ BANK ACC LIST *****/
    const GetBankList = () => {
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


    const handleGetBankListClick = () => {
        // Call the GetBankList function when the button is clicked
        GetBankList();
    };

    //***** READ BANK ACC LIST END *****/

    //***** SAVE DEBIT INFO *****/

    const handleDebitClick = async () => {
        SaveDebitInfo();
    };

    const SaveDebitInfo = async () => {
        let formData = new FormData();
        // formData.append('Amount', newAmount);
        // formData.append('UserId', `16`);
        // formData.append('DestBankId',);
        formData.append('Amount', debitDetail.Amount);
        formData.append('UserId', `16`);
        formData.append('DestBankId', debitDetail.DestBankId);

        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/SaveDebitInfo', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setMessage(jsonData.message); // Return the message from the API response
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    //***** SAVE DEBIT INFO *****/

    const handelDebitDetails = (e) => {
        setDebitDetails({ ...debitDetail, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div id="WithdrawMethod" style={{ width: '100%' }} className="offcanvas offcanvas-bottom bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Select Withdraw Method">Select Withdraw Method</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    {/*- bank config-*/}
                    <div className="list-group list-custom list-group-m rounded-xs">
                        <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#Pay81WithdrawModal" >
                            <img src="https://m.kissdiamond.net/images/81pay.png" className="rounded-xs" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <div><div className="trn eWallet" data-trn-key="81PAY Withdraw">81PAY Withdraw</div></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" onClick={handleGetBankListClick} data-bs-target="#WithdrawModal" >
                            <i className="has-bg bg-red-dark rounded-xs bi bi-bank2" />
                            <div><div className="trn eWallet" data-trn-key="Bank Transfer">Bank Transfer</div></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#UsdtWithdrawModal">
                            <i className="has-bg bg-yellow-dark rounded-xs bi bi-currency-bitcoin" />
                            <div><div className="trn eWallet" data-trn-key="USDT Withdraw">USDT Withdraw</div></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Withdrow Modal  */}
            <div id="WithdrawModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Withdraw">Withdraw</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div id="append_withdraw" className="mt-2" style={{ width: '100%' }}>
                        <small className="trn eWallet" data-trn-key="Checking turnover, please wait <i class=&quot;bi bi-hourglass-split&quot;></i>">Checking turnover, please wait <i className="bi bi-hourglass-split" /></small>
                    </div>
                    <form name="withdraw_form" className action encType="multipart/form-data" onsubmit="withdraw_submit(this)" method="post">
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent eWallet">
                            <i className="bi bi-currency-dollar font-13" />
                            <input type="number" className="form-control rounded-xs DepositModal" id="c20" name="Amount" placeholder="Please indicate amount" min={100} max={300000} required data-ph-trn-key="Please indicate amount"
                                value={debitDetail.Amount}
                                onChange={handelDebitDetails} />
                            <span>(<t data-trn-key="minimum">minimum</t> RM 100)</span>
                        </div>
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent eWallet">
                            <i className="bi bi-bank2 font-13" />
                            <select className="form-select rounded-xs DepositModal" id="withdraw_bank" name="DestBankId" onChange={
                                handelDebitDetails
                            }>
                                {MyBank.length > 0 && MyBank.map((data) =>
                                    <option className="banklist" value={data.Id}>{data.BankName}   {data.HolderName}   {data.AccNumber}</option>
                                )}
                            </select>
                        </div>


                        <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached" id="withdrawconfirm" style={{ bottom: 'calc(43px + env(safe-area-inset-bottom))', display: 'none' }}>
                            <div className="content mt-n2">
                                <h2 className="font-800 font-22 mt-2 mb-0 pt-3 trn" data-trn-key="Are you sure want to withdraw?">Are you sure want to withdraw?</h2>
                                <p style={{ display: 'none' }} />
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border border-fade-green color-green-dark trn" aria-label="Close" data-trn-key="Cancel">Cancel</a>
                                    </div>
                                    <div className="col-6">
                                        <button href="#" style={{ width: '100%' }} className="btn btn-s text-uppercase rounded-xs font-11 font-700 btn-full btn-border bg-green-dark color-green-dark trn" aria-label="Close" data-trn-key="Confirm">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <center>
                           
                            <Button outline color="warning"  className=" mt-4"  onClick={() => { handleDebitClick(); }}>Submit</Button>
                        </center>
                        <br />
                        <span className='eWallet'>* maximum withdraw limit 300k per day *</span>
                        <br />
                    </form>
                    <center>
                    </center>
                    <div className="card card-style bg-fade2-blue mt-5">
                        <div className="content">
                            <small className="color-blue-dark">
                                <span className="trn" data-trn-key="Valid withdrawal amount:">Valid withdrawal amount:</span> <br />
                                <span style={{ fontWeight: 'bold' }}>RM100 - RM150,000</span>
                                <br />
                                <span className="trn" data-trn-key="Maximum withdrawal 3 times per day.">Maximum withdrawal 3 times per day.</span> {/*- <br><span class='trn'>Currently withdraw</span> <span>0</span> <span class='trn'>times</span>*/}
                                <br />
                                <span className="trn" data-trn-key="If exceed 3 daily withdrawal limit will">If exceed 3 daily withdrawal limit will</span><br />
                                <span className="trn" data-trn-key="be subject to a 3% withdrawal fee.">be subject to a 3% withdrawal fee.</span>
                            </small>
                        </div>
                    </div>
                </div>
                {message && (
                    <div className={`alert alert-${messageType}`} role="alert">

                    </div>
                )}
                <ToastContainer />
            </div>
            {/* Withdrow Modal End */}
        </>
    )
}

export default WithdrawModal
