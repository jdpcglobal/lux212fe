import React, { useState, useEffect, useCallback } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { callPostApi } from '../ApiCaller';
import { Register_Post } from '../ApiConst';

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
        try {
            setUsernameLoader(true);
            const response = await fetch('https://lux212.azurewebsites.net/Api/CheckUsername', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            setApiResponse(jsonData.isSuccess);
        } catch (error) {
            console.error('Error:', error);
            setApiResponse(false);
        } finally {
            setUsernameLoader(false);
        }
    }, [userName]);

    useEffect(() => {
        if (userName.length >= 3) {
            checkUsername();
        }
    }, [userName, checkUsername]);


    // ***** UserName Api *****//


    return (
        <Modal show={show} onHide={close} className='Registration'>
            <Modal.Body>
                <div className="login-box">
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
                        )}

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

                        <Button outline color="success mb-4" onClick={() => { handleClick(); }}>Register</Button>


                        <label >
                            By creating an account, you agree to our Terms & Conditions and confirm that you are at least 25 years old.
                        </label>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Registration
