import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ChangePhone from './ChangePhone';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import SetPinApi from './SetPinApi';
import Cookies from 'universal-cookie';
import { useBalance } from './BalanceContext';
import Table from 'react-bootstrap/Table';


const UserProfile2 = () => {


    const { userData, balance } = useBalance();


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


    const goBack = () => {
        window.history.back();
    };


    //***** UserProfile Api *****//

    //***** UserProfile Api End *****//

    return (
      <div className='user-from-profile'>
        <div className='profile2'  >
            <div className="container w-100">
                <div className="row ">
                    <div className="col-3 " >

                    </div>

                    <div className="col-lg-8 UserTable" style={{ marginTop: '20px' }}>
                        <span className='BackButton profileTbe'>
                            <img onClick={goBack} width="54" height="54" src="https://img.icons8.com/sf-black-filled/64/circled-left-2.png" alt="circled-left-2" />User Profile
                        </span>
                        <div className="align-self-center" style={{ marginTop: '60px', color:"black" }}>
                            <label className="font-800 font-22 trn Title" data-trn-key="Deposit">User Profile </label>
                        </div>

                        <div className="container">
                            <div className="row profileTable2">
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}> Id</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {userData.Id}</div>
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  Name</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {userData.Name}</div>
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  User Name</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {userData.UId}</div>
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  Email</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {userData.Email} <Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangeEmailModal(true)}><i class="bi bi-pencil-fill"></i></Button></div>
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  Phone</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {userData.Phone}<Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangePhoneModal(true)}><i class="bi bi-pencil-fill"></i></Button></div>
                                <div className="col-4  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  Balance</div>
                                <div className="col-8  pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  {balance}</div>
                            </div>

                            <div className="row profileTable2 mt-5 ">
                                <div className="col-6 pt-2 pb-2 pColumn font-800 font-22 Td" style={{ textAlign: 'center', borderBottom: '1px solid black ' }}>Change Password ?</div>
                                <div className="col-6 pt-2 pb-2 pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  <Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangePasswordModal(true)}><i class="bi bi-pencil-fill"></i></Button></div>
                                <div className="col-6 pt-2 pb-2 pColumn font-800 font-22 Td" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  Set Pin ?</div>
                                <div className="col-6 pt-2 pb-2 pColumn" style={{ textAlign: 'center', borderBottom: '1px solid black' }}>  <Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setPinApiModal(true)}><i class="bi bi-pencil-fill"></i> </Button></div>
                            </div>
                        </div>


                         {/* <Table className="UserProfileTable ">
                            <tbody>
                                <tr className="Tr">
                                    <td className="Td">Id</td>
                                    <td>{userData.Id}</td>
                                </tr>
                                <tr className="Tr2">
                                    <td className="Td">Name</td>
                                    <td>{userData.Name}</td>
                                </tr>
                                <tr className="Tr">
                                    <td className="Td">User Name</td>
                                    <td>{userData.UId}</td>
                                </tr>
                                <tr className="Tr2 m-1">
                                    <td className="Td">Email</td>
                                    <td>{userData.Email} <Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangeEmailModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                </tr>
                                <tr className="Tr">
                                    <td className="Td">Phone</td>
                                    <td>{userData.Phone}<Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangePhoneModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                </tr>
                                <tr className="Tr2">
                                    <td className="Td">Balance</td>
                                    <td>{balance}</td>
                                </tr>
                            </tbody>
                        </Table> */}

                        {/*<Table className='UserProfileTable ' >
                            <tbody>
                                <tr className='Tr'>
                                    <td className="font-800 font-22 Td">Change Password ?</td>
                                    <td><Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setChangePasswordModal(true)}><i class="bi bi-pencil-fill"></i></Button></td>
                                </tr>
                                <tr className='Tr2'>
                                    <td className="font-800 font-22 Td">Set Pin ?</td>
                                    <td><Button style={{ marginLeft: '30px', width: '50px', marginTop: '-5px', marginBottom: '-5px' }} variant="outline-secondary" onClick={() => setPinApiModal(true)}><i class="bi bi-pencil-fill"></i> </Button></td>
                                </tr>
                            </tbody>
                        </Table> */}
                    </div>
                </div>
            </div>
            <ChangePhone show={changePhoneModal} close={toggleChangePhoneModal} setDrawCount={setDrawCount} />
            <ChangeEmailModal show={changeEmailModal} close={toggleChangeEmailModal} setDrawCount={setDrawCount} />
            <ChangePasswordModal show={changePasswordModal} close={toggleChangePasswordModal} setDrawCount={setDrawCount} />
            <SetPinApi smShow={pinApiModal} close={togglePinApiModal} setDrawCount={setDrawCount} />
        </div>
</div>
    )
}

export default UserProfile2;
