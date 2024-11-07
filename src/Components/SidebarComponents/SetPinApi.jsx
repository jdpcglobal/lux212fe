import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { callPostApi } from '../ApiCaller';
import { SetPin_Post, UserProfile_Post } from '../ApiConst';
import './SetPinApi.css'; // Import custom CSS

const SetPinApi = (props) => {
    const { smShow, close } = props;

    const [pinApi, setPinApi] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [pinDigits, setPinDigits] = useState(['', '', '', '']);
    const [oldPinDigits, setOldPinDigits] = useState(['', '', '', '']);

    useEffect(() => {
        UserProfileApi();
    }, []);

    const handleClick = () => {
        const pinValue = pinDigits.join('');
        const oldPinValue = oldPinDigits.join('');
        SetPin(pinValue, oldPinValue);
    };

    const SetPin = async (pinValue, oldPinValue) => {
        let reqObj = { ...pinApi };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Pin', pinValue);
        formData.append('OldPin', oldPinValue);

        callPostApi(SetPin_Post, formData, (jsonData) => {
            const respObj = jsonData.data;
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) setPinApi(respObj.data);
        });
    };

    const handlePinChange = (index, value) => {
        const newDigits = [...pinDigits];
        newDigits[index] = value;
        setPinDigits(newDigits);

        if (value && index < newDigits.length - 1) {
            document.getElementById(`pin-input-${index + 1}`)?.focus();
        }
    };

    const handleOldPinChange = (index, value) => {
        const newDigits = [...oldPinDigits];
        newDigits[index] = value;
        setOldPinDigits(newDigits);

        if (value && index < newDigits.length - 1) {
            document.getElementById(`old-pin-input-${index + 1}`)?.focus();
        }
    };

    const UserProfileApi = async () => {
        let formData = new FormData();
        formData.append('Token', data?.Token);

        callPostApi(UserProfile_Post, formData, (jsonData) => {
            if (jsonData.data.isSuccess) setData(jsonData.data);
            close();
        });
    };

    return (
        <>
            <Modal show={smShow} onHide={close} centered>
               
            <div className="modal-header-custom1">
                <h5 className="modal-title1">Change Phone</h5>
                <button className="close-btn" onClick={close}>×</button>
            </div>
                <Modal.Body>
                    <div className="pin-container">
                        <form>
                        <div className="user-box4">
                                    <label>Enter Old Pin</label>
                                    <div className="pin-input-group">
                                        {oldPinDigits.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength={1}
                                                id={`old-pin-input-${index}`}
                                                value={digit}
                                                onChange={(e) => handleOldPinChange(index, e.target.value)}
                                                className="pin-input"
                                            />
                                        ))}
                                    </div>
                                    </div>
                            <div className="user-box4">
                                <label>Enter New Pin</label>
                                <div className="pin-input-group">
                                    {pinDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            id={`pin-input-${index}`}
                                            value={digit}
                                            onChange={(e) => handlePinChange(index, e.target.value)}
                                            className="pin-input"
                                        />
                                    ))}
                                </div>
                            </div>
                            {data.IsPinSet && (
                                <div className="user-box4">
                                    <label>Enter Old Pin</label>
                                    <div className="pin-input-group">
                                        {oldPinDigits.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                maxLength={1}
                                                id={`old-pin-input-${index}`}
                                                value={digit}
                                                onChange={(e) => handleOldPinChange(index, e.target.value)}
                                                className="pin-input"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className='submit-button1'>
                            <Button className='submit-btn4' color="success" outline onClick={handleClick}>
                                Submit
                            </Button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SetPinApi;
