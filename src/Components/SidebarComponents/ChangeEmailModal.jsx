import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBalance } from './BalanceContext';
import { callPostApi } from '../ApiCaller';
import { RequestOtp_Post, SaveEmail_Post } from '../ApiConst';
 import './changeemail.css'; 

const ChangeEmailModal = (props) => {
    const { show, close } = props;

    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const { UserProfileApi } = useBalance();

    const onHandleClick = () => {
        RequestOtp();
    };

    const RequestOtp = async () => {
        let reqObj = {
            ...data,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Email', email);
        callPostApi(RequestOtp_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setData(respObj.data);
                setShowOtpInput(true);
                setHideButton(false);
                toast(respObj.message, {
                    type: respObj.isSuccess ? 'success' : 'error',
                });
            }
        });
    };

    const handleClick = async () => {
        const token = new Cookies().get("kisDiamond_LoggedIn")?.Token;
        await SaveEmail(token);
    };

    const SaveEmail = async (token) => {
        let formData = new FormData();
        formData.append('Token', token);
        formData.append('RequestId', data.RequestId);
        formData.append('Email', email);
        formData.append('Otp', otp);
        callPostApi(SaveEmail_Post, formData, jsonData => {
            const respObj = jsonData.data;
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                UserProfileApi();
                close(); // Close the modal on successful email change
            }
        });
    };

    return (
        <>
        <Modal show={show} onHide={close} className="change-email-modal" centered>
          
            <Modal.Body>
                <div className="login-box1">
                    <div className='header'>
                    <div className='title'>Change Email</div>
                    <button className="close-btn" onClick={close}>×</button>
                    </div>
                    
                    <form>
                        <div className="user-box">
                            <input
                                type="text"
                                placeholder=" "
                                required
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Enter Email</label>
                        </div>
                        {showOtpInput && (
                            <div className="user-box">
                                <input
                                    type="text"
                                    required
                                    autoComplete="off"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <label>Enter Otp</label>
                                <div className='submit-button'>
                                <Button
                                    className="btn-submit1"
                                    outline
                                    color="success"
                                    onClick={handleClick}
                                >
                                    Submit
                                </Button>
                                </div>
                            </div>
                        )}
                        {hideButton && (
                             <div className='submit-button'>
                            <Button
                                className="btn-submit1"
                                outline
                                color="success"
                                onClick={onHandleClick}
                            >
                                Submit
                            </Button>
                            </div>
                        )}
                    </form>
                </div>
                <ToastContainer />
            </Modal.Body>
        </Modal>
    </>
);
};

export default ChangeEmailModal;
