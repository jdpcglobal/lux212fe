import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { callPostApi } from '../ApiCaller';
import { ChangePassword_Post } from '../ApiConst';
import './ChangePasswordModal.css'; // Importing external CSS

const ChangePasswordModal = (props) => {
    const { show, close } = props;

    const [changePassword, setChangePassword] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    const [curPassword, setCurPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleClick = () => {
        confirmPassword();
        
    };

    const confirmPassword = async () => {
        let reqObj = { ...changePassword };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('CurPassword', curPassword);
        formData.append('NewPassword', newPassword);
        formData.append('ConfPassword', confPassword);

        callPostApi(ChangePassword_Post, formData, (jsonData) => {
            const respObj = jsonData.data;
            toast(respObj.message, {
                type: respObj.isSuccess ? 'success' : 'error',
            });
            if (respObj.isSuccess) {
                setChangePassword(respObj.data);
                close();
            }
        });
    };

    return (
        <>
            <Modal show={show} onHide={close} centered animation>
                <div className="modal-header3">
                    <h5 className="modal-title3">Change Password</h5>
                    <button type="button" className="close-btn" onClick={close}>
                        &times;
                    </button>
                </div>
                <Modal.Body className="modal-body-custom3">
                    <div className="login-box3">
                        <form>
                            <div className="user-box3">
                                <input
                                    type="password"
                                    required
                                    autoComplete="off"
                                    value={curPassword}
                                    onChange={(e) => setCurPassword(e.target.value)}
                                />
                                <label>Current Password</label>
                            </div>

                            <div className="user-box3">
                                <input
                                    type="password"
                                    required
                                    autoComplete="off"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label>New Password</label>
                            </div>

                            <div className="user-box3">
                                <input
                                    type="password"
                                    required
                                    autoComplete="off"
                                    value={confPassword}
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />
                                <label>Confirm Password</label>
                            </div>
<div className='submit-button'>
                            <Button outline color="success" className="submit-btn5" onClick={handleClick}>
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

export default ChangePasswordModal;
