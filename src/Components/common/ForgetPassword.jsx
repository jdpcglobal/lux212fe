import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  callPostApi } from '../ApiCaller';
import { ResetPassword_Post, VerifyOtp_Post } from '../ApiConst';
import { json } from 'react-router-dom';

const ForgetPassword = (props) => {
    const { show, close, setDrawCount } = props;
    const [password, setPassword] = useState({
        RequestId: ""
    })
    const [verifyOtp, setVerifyOtp] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [hideButton, setHideButton] = useState(true);

    //***** Reset password API *****/
    const handleClick = () => {
        ForgetPassword();
    };

    const ForgetPassword = async () => {
        let formData = new FormData();
        formData.append('Phone', phone);
        formData.append('Username', username);
        formData.append('Email', email);

        callPostApi(ResetPassword_Post, formData, (jsonData) => {
            const respObj = jsonData.data; 
            setMessage(respObj.message);
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                setPassword(respObj.data); 
            }
            if (formData.has('Phone') && formData.get('Phone').trim() !== '') {
                setShowOtpInput(true);
                setHideButton(false);
            }
        },
            (error) => {

            }
        );


    };
    //***** Reset password API End *****/


    //***** Reset VeriFyOtp API *****/
    const handleVeryFyClick = () => {
        VeriFyOtp();
    };

    const VeriFyOtp = async () => {
        let formData = new FormData();
        formData.append('Phone', phone);
        formData.append('Otp', otp);
        formData.append('RequestId', password.RequestId);
        callPostApi(VerifyOtp_Post, formData, jsonData => {
            const respObj = jsonData.data;
            setVerifyOtp(respObj.message);
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                let a = document.createElement('a');
                a.target = '_blank';
                a.href = respObj.data;
                a.click();

            }
        })
        
    };
    //***** Reset VeriFyOtp API End *****/

    return (
        <>
            <Modal show={show} onHide={close} >
                <Modal.Body>
                    <div className="login-box">
                        <h2>Forget Password</h2>
                        <form>
                            <div className="user-box">
                                <input type="text" name="" required="" value={phone || username || email}
                                    onChange={(e) => {
                                        setPhone('');
                                        setUsername('');
                                        setEmail('');
                                        // Determine which field to update based on the input value
                                        if (/^\d+$/.test(e.target.value)) {
                                            setPhone(e.target.value);
                                        } else if (/\S+@\S+\.\S+/.test(e.target.value)) {
                                            setEmail(e.target.value);
                                        } else {
                                            setUsername(e.target.value);
                                        }
                                    }} />
                                <label>Enter your User Name or Phone or Email</label>
                            </div>
                            {showOtpInput && (
                                <div className="user-box">
                                    <input type="password" name="" required="" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    <label>OTP</label>
                                    <Button outline color="success" onClick={handleVeryFyClick} >Submit</Button>
                                </div>
                            )}
                            {hideButton && (
                            <Button outline color="success" onClick={handleClick} >Submit</Button>
                            )}
                        </form>
                    </div>
                    {verifyOtp && (
                        <div className={`alert alert-${messageType}`} role="alert">
                        </div>
                    )}
                    <ToastContainer />
                </Modal.Body>
            </Modal >
        </>
    )
}

export default ForgetPassword
