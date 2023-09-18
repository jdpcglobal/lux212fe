import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { callPostApi } from '../ApiCaller';
import { UserProfile_Post } from '../ApiConst';

const SetPinApi = (props) => {
    const { smShow, close } = props;
    const [messageType,] = useState('');
    const [pinApi, setPinApi] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [data, setData] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });
    const [pinDigits, setPinDigits] = useState(['', '', '', '']);
    const [oldPinDigits, setOldPinDigits] = useState(['', '', '', '']);


    //***** Set Pin Api *****//

    const handleClick = () => {
        const pinValue = pinDigits.join('');
        const oldPinValue = oldPinDigits.join(''); // Get the Old Pin value
        SetPin(pinValue, oldPinValue); // Pass both PIN and Old Pin values
    }

    const SetPin = async (pinValue, oldPinValue) => {
        let reqObj = {
            ...pinApi,
        }
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Pin', pinValue);
        formData.append('OldPin', oldPinValue); // Include the Old Pin value
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/SetPin', {
                method: 'post',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setPinApi(jsonData.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handlePinChange = (index, value) => {
        const newDigits = [...pinDigits];
        newDigits[index] = value;

        if (value === '' && index > 0) {
            // If backspace is pressed and not the first box, focus on the previous input
            const previousInput = document.getElementById(`pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        } else if (index < newDigits.length - 1 && value !== '') {
            // If not the last digit and a value is entered, focus on the next input
            const nextInput = document.getElementById(`pin-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        } else if (index === newDigits.length - 1 && value === '') {
            // If backspace is pressed in the last box, focus on the previous input
            const previousInput = document.getElementById(`pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        }

        setPinDigits(newDigits);
    };

    const handleOldPinChange = (index, value) => {
        const newDigits = [...oldPinDigits];
        newDigits[index] = value;

        if (value === '' && index > 0) {
            // If backspace is pressed and not the first box, focus on the previous input
            const previousInput = document.getElementById(`old-pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        } else if (index < newDigits.length - 1 && value !== '') {
            // If not the last digit and a value is entered, focus on the next input
            const nextInput = document.getElementById(`old-pin-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        } else if (index === newDigits.length - 1 && value === '') {
            // If backspace is pressed in the last box, focus on the previous input
            const previousInput = document.getElementById(`old-pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        }

        setOldPinDigits(newDigits);
    };
    //***** Set Pin Api End *****//

    //***** UserProfile Api *****//
    useEffect(() => {
        UserProfileApi()
    }, []);

    const UserProfileApi = async () => {
        let reqObj = {
            ...data,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        callPostApi(UserProfile_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setData(respObj.data); // Return the message from the API response
            }
        })
    };
    //***** UserProfile Api End *****//

    const handleRefreshClick = () => {
        window.location.reload(); // Reloads the page
    };

    return (
        <>
            <Modal show={smShow} onHide={close} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Body>

                    <div className="login-box">
                        <h2>Set Pin</h2>
                        <form>
                            <div className="user-box">
                                {pinDigits.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        className="pin-input-box"
                                        style={{ width: '25px', marginLeft: '30px', textAlign: 'center' }}
                                        autoComplete="off"
                                        value={digit}
                                        id={`pin-input-${index}`}
                                        onChange={(e) => handlePinChange(index, e.target.value)}
                                    />
                                ))}
                                <label>Pin</label>
                            </div>
                            {data.IsPinSet && (
                                <div className="user-box">
                                    {oldPinDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            className="pin-input-box"
                                            style={{ width: '25px', marginLeft: '30px', textAlign: 'center' }}
                                            autoComplete="off"
                                            value={digit}
                                            id={`old-pin-input-${index}`}
                                            onChange={(e) => handleOldPinChange(index, e.target.value)}
                                        />
                                    ))}
                                    <label>Old Pin</label>
                                </div>
                            )}
                            <Button outline color='success' onClick={() => { handleClick(); }}>
                                Submit
                            </Button>
                        </form>
                    </div>
                    {pinApi && (
                        <div className={`alert alert-${messageType}`} role="alert" style={{ margin: '0', padding: '0' }}>
                        </div>
                    )}
                    <ToastContainer />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SetPinApi
