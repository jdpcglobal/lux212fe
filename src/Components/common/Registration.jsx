import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { callPostApi } from '../ApiCaller';
import { CheckUsername_Post, Register_Post } from '../ApiConst';

const Registration = (props) => {
    const { show, close } = props;
    const [register, setRegister] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [bank, setBank] = useState('');
    const [bankAccountNo, setBankAccountNo] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [otpMethod, setOtpMethod] = useState('email');
    const [requestId, setRequestId] = useState('')
    const [error, setError] = useState(false)
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [setUsername, username] = useState('');
    const [usernameLoader, setUsernameLoader] = useState(false)
    const [apiResponse, setApiResponse] = useState(null);



    //*****Register API *****/
    const handleClick = async (e) => {
        // e.preventDefault();
        // if (otp.length === 0) {
        //     setError(true);
        //     return;
        // }
        // Call the Register function to get the data and message
        if (name.length === 0 || userName.length === 0 || userName.length < 3 || email.length === 0 || phone.length === 0 || password.length === 0 || confPassword.length === 0 || bank.length === 0 || bankAccountNo.length === 0 || apiResponse === false) {
            setError(true);
            return;
        }
        await Register();
    };

    const Register = async () => {
        let formData = new FormData();
        formData.append('Name', name);
        formData.append('UserId', userName);
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('ConfPassword', confPassword);
        formData.append('Bank', bank);
        formData.append('BankAccountNo', bankAccountNo);
        formData.append('Phone', phone);
        // formData.append('Otp', otp);
        // formData.append('OTPid', requestId);
        callPostApi(Register_Post, formData, (jsonData) => {
            toast(jsonData.data.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            setMessage(jsonData.message);
            if (jsonData.isSuccess) {
                setRegister(jsonData.data.data);

            }

        }

        )

    };


    //*****Register API End *****/


    //*****Request Otp *****/
    // const handleOtpClick = async (e) => {
    //     e.preventDefault();
    //     if (name.length === 0 || userName.length === 0 || userName.length < 3 || email.length === 0 || phone.length === 0 || password.length === 0 || confPassword.length === 0 || bank.length === 0 || bankAccountNo.length === 0) {
    //         setError(true);
    //         return;
    //     }

    //     if (name && userName && email && phone && password && confPassword && bank && bankAccountNo && apiResponse) {
    //         let formData = new FormData();
    //         if (otpMethod === 'email') {
    //             formData.append('Email', email);
    //         } else if (otpMethod === 'phone') {
    //             formData.append('Phone', phone);
    //         }
    //         try {
    //             const response = await fetch('https://lux212.azurewebsites.net/Api/RequestOtp', {
    //                 method: 'POST',
    //                 body: formData,
    //             });
    //             const jsonData = await response.json();
    //             if (jsonData.isSuccess) {
    //                 toast(jsonData.message, {
    //                     type: jsonData.isSuccess ? 'success' : 'error',
    //                 });
    //                 setRequestId(jsonData.data.RequestId);
    //                 setDrawCount(pre => pre + 1);
    //                 setShowOtpInput(true);
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     }
    // };
    //*****Request Otp *****/

    // ***** UserName Api *****//


    const checkUsername = useCallback(async () => {
        let formData = new FormData();
        formData.append('Username', userName);
        setUsernameLoader(true);
        callPostApi(CheckUsername_Post, formData, jsonData => {
            const respObj = jsonData.data;
            setApiResponse(respObj.isSuccess);
            setUsernameLoader(false);
        })

    }, [userName]);

    useEffect(() => {
        if (userName.length >= 3) {
            checkUsername();
        }
    }, [userName, checkUsername]);


    // ***** UserName Api *****//


    return (
        <Modal show={show} onHide={close} className='Registration'>
            <Modal.Body className='RegisterName'>
                {/* <div className="login-box">
                    <h4>Create Luxury212 account</h4>
                    <form>
                        <div className="user-box">
                            {error && name.length <= 0 ?
                                <label style={{ color: "red" }}>** Enter  your Name **</label> : ""}
                            <input type="text" name="" required="" value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <label>Name</label>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-10">
                                    <div className="user-box">
                                        {error && userName.length <= 0 ? (
                                            <label style={{ color: "red" }}>** Enter your User Name **</label>
                                        ) : error && userName.length > 0 && userName.length < 3 ? (
                                            <label style={{ color: "red" }}>___three characters Required **</label>
                                        ) : (
                                            ""
                                        )}
                                        <input
                                            type="text"
                                            name=""
                                            required=""
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <label>Username</label>
                                    </div>

                                </div>
                                <div className="col-2">
                                    {usernameLoader ? (
                                        <Loader width={120} />
                                    ) : (
                                        apiResponse === true ? <span> <img width="48" height="48" src="https://img.icons8.com/emoji/48/check-mark-button-emoji.png" alt="check-mark-button-emoji" /></span> : <span><img width="48" height="48" src="https://img.icons8.com/color/48/cancel--v1.png" alt="cancel--v1" /></span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="user-box">
                            {error && email.length <= 0 ?
                                <label style={{ color: "red" }}>** Enter your Email **</label> : ""}
                            <input type="text" name="" required="" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <label>User Email</label>
                        </div>

                        <div className="user-box">
                            {error && phone.length <= 0 ?
                                <label style={{ color: "red" }}>** Enter your Contact **</label> : ""}
                            <input type="number" name="" required="" value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <label>Contact Number</label>
                        </div>
                        <div className="user-box">
                            {error && password.length <= 0 ?
                                <label style={{ color: "red" }}>** Set Password **</label> : ""}
                            <input type="number" name="" required="" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>
                        <div className="user-box">
                            {error && confPassword.length <= 0 ?
                                <label style={{ color: "red" }}>** Confirm Password **</label> : ""}
                            <input type="number" name="" required="" value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)} />
                            <label>Confirm Password</label>
                        </div>
                        <div className="user-box">
                            {error && bank.length <= 0 ?
                                <label style={{ color: "red" }}>** Enter Bank Name **</label> : ""}
                            <input type="text" name="" required="" value={bank}
                                onChange={(e) => setBank(e.target.value)} />
                            <label>Bank</label>
                        </div>
                        <div className="user-box">
                            {error && bankAccountNo.length <= 0 ?
                                <label style={{ color: "red" }}>** Enter Acc Number **</label> : ""}
                            <input type="number" name="" required="" value={bankAccountNo}
                                onChange={(e) => setBankAccountNo(e.target.value)} />
                            <label>Account Number</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="" required="" />
                            <label>Referral</label>
                        </div>

                        {showOtpInput && (
                            <div className="user-box">
                                {error && otp.length <= 0 ?
                                    <label style={{ color: "red" }}>** Enter Otp first **</label> : ""}
                                {message && (
                                    <div className={`alert alert-${messageType}`} role="alert">
                                    </div>
                                )}
                                <ToastContainer />
                                <input type="text" name="" required="" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                <label>Enter OTP</label>
                            </div>
                        )} */}





                {/* <div className="formbold-input-radio-wrapper">
                            <label htmlFor="ans" className="formbold-form-label" style={{ color: "goldenrod" }}> Send OTP by</label>
                            <div className="formbold-radio-flex">
                                <div className="formbold-radio-group">
                                    <label className="formbold-radio-label" style={{ color: 'goldenrod' }}>
                                        <input className="formbold-input-radio" type="radio" value="email" checked={otpMethod === 'email'} onChange={() => setOtpMethod('email')} />
                                        Email
                                        <span className="formbold-radio-checkmark" />
                                    </label>
                                </div>
                                <div className="formbold-radio-group">
                                    <label className="formbold-radio-label" style={{ color: 'goldenrod' }}>
                                        <input className="formbold-input-radio" type="radio" checked={otpMethod === 'phone'} onChange={() => setOtpMethod('phone')} />
                                        Phone
                                        <span className="formbold-radio-checkmark" />
                                    </label>
                                </div>
                            </div>
                        </div> 
                        <a href="#">
                            <span />
                            <span />
                            <span />
                            <span />
                            <Button variant="warning" onClick={handleOtpClick}>Send OTP</Button>
                        </a>
                        */}
                {/* {showOtpInput && ( )} */}





                {/* <Button outline color="success mb-4" onClick={() => { handleClick(); }}>Register</Button>


                        <label >
                            By creating an account, you agree to our Terms & Conditions and confirm that you are at least 25 years old.
                        </label>
                    </form>
                </div> */}



                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5
                                className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn"
                                data-trn-key="Welcome"
                            >
                                Welcome
                            </h5>
                            <h1 className="font-800 font-22 trn" data-trn-key="Register">
                                Register
                            </h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a
                                href="#"
                                className="btn btn-xxs gradient-night"
                                onclick="switch_lang()"
                                style={{color:"white"}}
                            >
                                <i className=" bi bi-translate"  /> 中文 / EN
                            </a>

                        </div>
                    </div>
                    <form>
                        <div style={{ width: 500 }} id="reader" />
                        <input type="hidden" name="merchant" defaultValue="DMD" />
                        <input
                            defaultValue="---"
                            type="hidden"
                            className="form-control border-secondary"
                            name="username"
                            required=""
                            style={{ display: "hidden", width: "95%" }}
                        />

                        {error && name.length <= 0 ?
                            <label style={{ color: "red" }}>** Enter  your Name **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-person-check-fill font-17" />
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Name)
                            </span>
                        </div>


                        {error && userName.length <= 0 ? (
                            <label style={{ color: "red" }}>** Enter your User Name **</label>
                        ) : error && userName.length > 0 && userName.length < 3 ? (
                            <label style={{ color: "red" }}>** three characters Required **</label>
                        ) : (
                            ""
                        )}

                        <div className="container">
                            <div className="row">
                                <div className="col-10">
                                    <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                                        <i className="bi bi-person-check-fill font-17" />
                                        <input
                                            name="afid"
                                            type="text"
                                            id="real_afid2"
                                            className="form-control rounded-xs"
                                            placeholder="User Name"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            autoComplete='off'
                                        />
                                        <label htmlFor="c17" className="color-theme">
                                            {" "}
                                        </label>

                                        <span className="trn" data-trn-key="Affiliate">
                                            (UserName)
                                        </span>
                                    </div>

                                </div>
                                <div className="col-2">
                                    {usernameLoader ? (
                                        <Loader width={120} />
                                    ) : (
                                        apiResponse === true ? <span> <img width="48" height="48" src="https://img.icons8.com/emoji/48/check-mark-button-emoji.png" alt="check-mark-button-emoji" /></span> : <span><img width="48" height="48" src="https://img.icons8.com/color/48/cancel--v1.png" alt="cancel--v1" /></span>
                                    )}
                                </div>
                            </div>
                        </div>


                        {error && email.length <= 0 ?
                            <label style={{ color: "red" }}>** Enter your Email **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            {/* <i className="bi bi-person-check-fill font-17" /> */}
                            <i class="bi bi-envelope-fill "></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Email)
                            </span>
                        </div>



                        {error && phone.length <= 0 ?
                            <label style={{ color: "red" }}>** Enter your Contact **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-telephone-fill font-13" />

                            <div className="" style={{ display: "inline" }}>
                                <input
                                    name="tel"
                                    type="tel"
                                    className="form-control rounded-xs"
                                    id="register_phone_number"
                                    placeholder="Phone"
                                    style={{
                                        display: "inline",
                                        paddingLeft: "15px !important"
                                    }}
                                    autoComplete="off"
                                    required=""
                                    data-ph-trn-key="Phone"
                                    fdprocessedid="jzbg7x"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor="register_phone_number" className="color-theme">
                                    Phone
                                </label>
                                <span className="trn" data-trn-key="(required)">
                                    (required)
                                </span>
                            </div>
                        </div>



                        {error && password.length <= 0 ?
                            <label style={{ color: "red" }}>** Set Password **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            {/* <i className="bi bi-person-check-fill font-17" /> */}
                            <i class="bi bi-building-fill-lock"></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Password)
                            </span>
                        </div>


                        {error && confPassword.length <= 0 ?
                            <label style={{ color: "red" }}>** Confirm Password **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i class="bi bi-building-fill-lock"></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Confirm Password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Confirm)
                            </span>
                        </div>


                        {error && bank.length <= 0 ?
                            <label style={{ color: "red" }}>** Enter Bank Name **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i class="bi bi-bank2"></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Bank"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Bank Name)
                            </span>
                        </div>


                        {error && bankAccountNo.length <= 0 ?
                            <label style={{ color: "red" }}>** Enter Acc Number **</label> : ""}
                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i class="bi bi-123"></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Account Number"
                                value={bankAccountNo}
                                onChange={(e) => setBankAccountNo(e.target.value)}
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Acc Number)
                            </span>
                        </div>

                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i class="bi bi-people-fill"></i>
                            <input
                                name="afid"
                                type="text"
                                id="real_afid2"
                                className="form-control rounded-xs"
                                placeholder="Referral"
                                autoComplete='off'
                            />
                            <label htmlFor="c17" className="color-theme">
                                {" "}
                            </label>
                            <span className="trn" data-trn-key="Affiliate">
                                (Referral)
                            </span>
                        </div>
                        <Button className="btn btn-full gradient-blue shadow-bg shadow-bg-s mt-4 button_100 trn" onClick={() => { handleClick(); }}>Register</Button>
                    </form>
                    {message && (
                        <div className={`alert alert-${messageType}`} role="alert">
                        </div>
                    )}
                    <ToastContainer />
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Registration
