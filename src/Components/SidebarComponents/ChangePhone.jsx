import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBalance } from './BalanceContext';
import { callPostApi } from '../ApiCaller';
import { RequestOtp_Post, SavePhone_Post } from '../ApiConst';
import './ChangePhoneModal.css'; // Import CSS for styling

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

    const onHandleClick = () => RequestOtp();

    const RequestOtp = async () => {
        let formData = new FormData();
        formData.append('Token', data?.Token);
        formData.append('Phone', phone);

        callPostApi(RequestOtp_Post, formData, (jsonData) => {
            const respObj = jsonData.data;
            toast(respObj.message, { type: respObj.isSuccess ? 'success' : 'error' });

            if (respObj.isSuccess) {
                setData(respObj.data);
                setShowOtpInput(true);
                setHideButton(false);
            }
        });
    };

    const handleClick = () => SavePhone();

    const SavePhone = async () => {
        let formData = new FormData();
        formData.append('Token', changePhone?.Token);
        formData.append('RequestId', data.RequestId);
        formData.append('Phone', phone);
        formData.append('Otp', otp);

        callPostApi(SavePhone_Post, formData, (jsonData) => {
            const respObj = jsonData.data;
            toast(respObj.message, { type: respObj.isSuccess ? 'success' : 'error' });

            if (respObj.isSuccess) {
                setChangePhone(respObj.data);
                UserProfileApi();
                close();
            }
        });
    };

    return (
        <Modal show={show} onHide={close} centered className="custom-modal">
           
            <Modal.Body>
            <div className="modal-header-custom1">
                <h5 className="modal-title1">Change Phone</h5>
                <button className="close-btn" onClick={close}>×</button>
            </div>
                <div className="login-box1">
                    <form>
                        <div className="user-box1">
                            <input
                                type="number"
                                required
                                autoComplete="off"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label>Enter Phone</label>
                        </div>
                        {showOtpInput && (
                            <div className="user-box1">
                                <input
                                    type="text"
                                    required
                                    autoComplete="off"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <label>Enter OTP</label>
                                <div className='submit-button1'>
                                <Button className='submit-btn1' outline color="success" onClick={handleClick}>
                                    Submit
                                </Button>
                                </div>
                            </div>
                        )}
                        <ToastContainer />
                        {hideButton && (
                             <div className='submit-button1'>
                            <Button className='submit-btn1' outline color="success" onClick={onHandleClick}>
                                Request OTP
                            </Button>
                            </div>
                        )}
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ChangePhone;
