import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ChangePhone from './ChangePhone';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import SetPinApi from './SetPinApi';
import Cookies from 'universal-cookie';
import Sidebar from '../Sidebar';
import ChangeExample from './changeExample';

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
                            <div className="align-self-center" >
                                <label className="font-800 font-22 trn Title" data-trn-key="Deposit">User Profile </label>
                            </div>
                            <table className="UserProfileTable">
                                <tbody>
                                    <tr className="Tr">
                                        <td className="Td">Id</td>
                                        <td>{data.Id}</td>
                                    </tr>
                                    <tr className="Tr2">
                                        <td className="Td">Name</td>
                                        <td>{data.Name}</td>
                                    </tr>
                                    <tr className="Tr">
                                        <td className="Td">User Name</td>
                                        <td>{data.UId}</td>
                                    </tr>
                                    <tr className="Tr2">
                                        <td className="Td">Email</td>
                                        <td>{data.Email} <Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangeEmailModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                    </tr>
                                    <tr className="Tr">
                                        <td className="Td">Phone</td>
                                        <td>{data.Phone}<Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangePhoneModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                    </tr>
                                    <tr className="Tr2">
                                        <td className="Td">Balance</td>
                                        <td>{data.CreditBalance}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row " >
                        <div className="col-3"></div>
                        <div className="col-4 UserTable">
                            <table className='Table' >
                                <tbody>
                                    <tr className='Tr'>
                                        <td className="font-800 font-22 Td">Change Password ?</td>
                                        <td><Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setChangePasswordModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                    </tr>
                                    <tr className='Tr2'>
                                        <td className="font-800 font-22 Td">Set Pin ?</td>
                                        <td><Button style={{ marginLeft: '30px', width: '50px' }} variant="outline-secondary" onClick={() => setPinApiModal(true)}><i class="bi bi-pencil-fill"></i> </Button></td>
                                    </tr>
                                </tbody>
                            </table>
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
