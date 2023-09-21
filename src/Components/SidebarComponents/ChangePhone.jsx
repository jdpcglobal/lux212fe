import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBalance } from './BalanceContext';
import { callPostApi } from '../ApiCaller';
import { RequestOtp_Post, SavePhone_Post } from '../ApiConst';

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
    const { UserProfileApi } = useBalance();


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
        callPostApi(RequestOtp_Post, formData, jsonData => {
            const respObj = jsonData.data;
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                setData(respObj.data);
                setShowOtpInput(true);
                setHideButton(false);
            }
        })
        
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
        callPostApi(SavePhone_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setChangePhone(respObj.data)
                UserProfileApi();
                setShowOtpInput(true);
                toast(respObj.message, {
                    type: respObj.isSuccess ? 'success' : 'error',
                });
            }
        })
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
                                    <Button outline color='success' onClick={handleClick}>Submit</Button>
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
