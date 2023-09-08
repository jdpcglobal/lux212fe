import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeEmailModal = (props) => {
    const { show, close } = props;

    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [changeEmail, setChangeEmail] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [messageType, setMessageType] = useState('');


    const RequestOtp = async () => {
        let reqObj = {
            ...data,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Email', email);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/RequestOtp', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setData(jsonData.data);
                setShowOtpInput(true);
                setHideButton(false);
                toast(jsonData.message, {
                    type: jsonData.isSuccess ? 'success' : 'error',
                });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const SaveEmail = async () => {
        let reqObj = {
            ...changeEmail,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('RequestId', data.RequestId);
        formData.append('Email', email);
        formData.append('Otp', otp);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/SaveEmail', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setChangeEmail(jsonData.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const onHandleClick = () => {
        RequestOtp();
    };

    const handleClick = () => {
        SaveEmail();
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
                                    <Button outline color="warning" onClick={handleClick}>
                                        Submit
                                    </Button>
                                </div>
                            )}

                            {hideButton && (
                                <a href="#">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <Button outline color="warning" onClick={onHandleClick}>
                                        Submit
                                    </Button>
                                </a>
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
