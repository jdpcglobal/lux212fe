import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePhone = (props) => {
    const { show, close, setDrawCount } = props;
    const [otp, setOtp] = useState('');
    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });
    const [phone, setPhone] = useState('');
    const [changePhone, setChangePhone] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [hideButton, setHideButton] = useState(true);
    const [messageType, setMessageType] = useState('');


    //***** Request Otp Api *****//

    const onHandleClick = () => {
        RequestOtp()
    }
    const RequestOtp = async () => {
        let reqObj = {
            ...data,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Phone', phone);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/RequestOtp', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setData(jsonData.data);
                setShowOtpInput(true);
                setHideButton(false);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    //***** Request Otp Api End *****//

    //***** Change Phone Api *****//

    const handleClick = () => {
        SavePhone();
    }
    const SavePhone = async () => {
        let reqObj = {
            ...changePhone,
        }
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('RequestId', data.RequestId);
        formData.append('Phone', phone);
        formData.append('Otp', otp);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/SavePhone', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setChangePhone(jsonData.data)
                setShowOtpInput(true);
                toast(jsonData.message, {
                    type: jsonData.isSuccess ? 'success' : 'error',
                });
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    //***** Change Phone Api End *****//


    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <div className="login-box">
                        <h2>Change Phone</h2>
                        <form>
                            <div className="user-box">
                                <input type="number" name="" required="" autoComplete='off' value={phone}
                                    onChange={(e) => setPhone(e.target.value)} />
                                <label>Enter Phone</label>
                            </div>
                            {showOtpInput && (
                                <div className="user-box">
                                    <input type="text" name="" required="" autoComplete='off' value={otp}
                                        onChange={(e) => setOtp(e.target.value)} />
                                    <label>Enter Otp</label>
                                    <Button outline color='warning' onClick={handleClick}>Submit</Button>
                                </div>
                            )}
                            {data && (
                                <span className={`alert alert-${messageType}`} role="alert">
                                </span>
                            )}
                            <ToastContainer />
                            {hideButton && (
                                <Button outline color='success' onClick={onHandleClick}>Submit</Button>
                            )}
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePhone
