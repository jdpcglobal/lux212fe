import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordModal = (props) => {
    const { show, close } = props;

    const [changePassword, setChangePassword] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setCofPassword] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleClick = () => {
        confirmPassword();
    };

    const confirmPassword = async () => {
        let reqObj = {
            ...changePassword,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('CurPassword', curPassword);
        formData.append('NewPassword', newPassword);
        formData.append('ConfPassword', confPassword);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/ChangePassword', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                setChangePassword(jsonData.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <div className="login-box">
                        <h2>Login</h2>
                        <form>
                            <div className="user-box">
                                <input
                                    type="password"
                                    name=""
                                    required=""
                                    autoComplete="off"
                                    value={curPassword}
                                    onChange={(e) => setCurPassword(e.target.value)}
                                />
                                <label>Current Password</label>
                            </div>

                            <div className="user-box">
                                <input
                                    type="password"
                                    name=""
                                    required=""
                                    autoComplete="off"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label>New Password</label>
                            </div>

                            <div className="user-box">
                                <input
                                    type="password"
                                    name=""
                                    required=""
                                    autoComplete="off"
                                    value={confPassword}
                                    onChange={(e) => setCofPassword(e.target.value)}
                                />
                                <label>Confirm Password</label>
                            </div>

                            <Button outline color="warning" onClick={handleClick}>
                                Submit
                            </Button>
                        </form>
                    </div>
                    {changePassword && (
                        <div className={`alert alert-${messageType}`} role="alert">
                            {/* Display any additional messages if needed */}
                        </div>
                    )}
                    <ToastContainer />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangePasswordModal;
