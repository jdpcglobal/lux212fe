import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBalance } from './BalanceContext';
import { callPostApi } from '../ApiCaller';
import { RequestOtp_Post, SaveEmail_Post } from '../ApiConst';

const ChangeEmailModal = (props) => {
    const { show, close } = props;

    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [messageType, setMessageType] = useState('');
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
        })
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
            }
        })

    };

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <div className="login-box">
                        <h2>Change Email</h2>
                        <form>
                            <div className="user-box">
                                <input type="text" name="" required="" autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <label>Enter Email</label>
                            </div>
                            {showOtpInput && (
                                <div className="user-box">
                                    <input type="text" name="" required="" autoComplete="off"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)} />
                                    <label>Enter Otp</label>
                                    <Button outline color="success" onClick={handleClick}>
                                        Submit
                                    </Button>
                                </div>
                            )}

                            {hideButton && (
                                <Button outline color="success" onClick={onHandleClick}>
                                    Submit
                                </Button>
                            )}
                        </form>
                    </div>
                    {data && (
                        <span className={`alert alert-${messageType}`} role="alert">
                        </span>
                    )}
                    <ToastContainer />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangeEmailModal;
