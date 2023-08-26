import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ChangePhone from './ChangePhone';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import SetPinApi from './SetPinApi';
import Cookies from 'universal-cookie';
import Sidebar from '../Sidebar';

const UserProfile = () => {

    const [data, setData] = useState({
        Id: "",
        Name: "",
        UId: "",
        Email: "",
        Phone: "",
        CreditBalance: "",
        ParentId: "",
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })



    const [changePhoneModal, setChangePhoneModal] = useState(false)
    const [changeEmailModal, setChangeEmailModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [pinApiModal, setPinApiModal] = useState(false)
    const [drawCount, setDrawCount] = useState(0)


    const toggleChangePhoneModal = () => {
        setChangePhoneModal(false)
    }
    const toggleChangeEmailModal = () => {
        setChangeEmailModal(false)
    }
    const togglePinApiModal = () => {
        setPinApiModal(false)
    }
    const toggleChangePasswordModal = () => {
        setChangePasswordModal(false)
    }

    useEffect(() => {
    }, [drawCount]);


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
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/UserProfile', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setData(jsonData.data); // Return the message from the API response
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    //***** UserProfile Api End *****//

    return (
        <>
            <div id="WalletModal" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="container">


                        <div className="container">
                            
                            <div className="row">
                                <div className="col-3 MainSidebar">
                                    <Sidebar />
                                </div>

                                <div className="col-lg-8 UserTable">
                                    <div className="d-flex pb-2">
                                        <div className="align-self-center ms-auto">
                                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                                        </div>
                                        
                                    </div>
                                    <h3 className='Title' style={{ fontSize: '25px', fontWeight: '800', width: '11.5rem' }}>User Profile</h3>
                                    <Table striped bordered hover variant="dark">
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Id</td>
                                                <td>{data.Id}</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Name</td>
                                                <td>{data.Name}</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>User Name</td>
                                                <td>{data.UId}</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>Email</td>
                                                <td>{data.Email} <Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangeEmailModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>Phone</td>
                                                <td>{data.Phone}<Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangePhoneModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>CreditBalance</td>
                                                <td>{data.CreditBalance}</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td>ParentId</td>
                                                <td>{data.ParentId}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="row " >
                                <div className="col-3"></div>
                                <div className="col-4 UserTable">
                                    <Table striped bordered hover variant="dark">
                                        <tbody>
                                            <tr>
                                                <td><h4>Change Password ?</h4></td>
                                                <td><Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangePasswordModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                            </tr>
                                            <tr>
                                                <td><h4>Set Pin ?</h4></td>
                                                <td><Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setPinApiModal(true)}><i class="bi bi-pencil-fill"></i> </Button></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ChangePhone show={changePhoneModal} close={toggleChangePhoneModal} setDrawCount={setDrawCount} />
            <ChangeEmailModal show={changeEmailModal} close={toggleChangeEmailModal} setDrawCount={setDrawCount} />
            <ChangePasswordModal show={changePasswordModal} close={toggleChangePasswordModal} setDrawCount={setDrawCount} />
            <SetPinApi smShow={pinApiModal} close={togglePinApiModal} setDrawCount={setDrawCount} />

        </>
    )
}

export default UserProfile
