import React from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';

const LogoutModal = (props) => {
    const { show, close } = props;

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('kisDiamond_LoggedIn');
        window.location.reload();
    };

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <div className="login-box">
                        <h2>Logout</h2>
                        <form>
                            <div className="user-box">
                                <label>Do You Really Want To Logout?</label>
                            </div>

                            <a href="#">
                                <span />
                                <span />
                                <span />
                                <span />
                                <Button outline color='warning' onClick={handleLogout}>Yes</Button>
                            </a>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LogoutModal;
