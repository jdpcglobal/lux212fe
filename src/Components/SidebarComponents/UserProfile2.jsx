import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ChangePhone from './ChangePhone';
import ChangeEmailModal from './ChangeEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import SetPinApi from './SetPinApi';
import Cookies from 'universal-cookie';
import { useBalance } from './BalanceContext';
import Table from 'react-bootstrap/Table';
import './userprofile.css';


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
        <div className='profile2'  >
            <div className="container w-100">
                <div className="row ">
                    <div className="col-3 " >

                    </div>

                    <div className="col-lg-8 UserTable" style={{ marginTop: '20px' }}>
                        {/* <span className='BackButton profileTbe'>
                            <img onClick={goBack} width="54" height="54" src="https://img.icons8.com/sf-black-filled/64/circled-left-2.png" alt="circled-left-2" />User Profile
                        </span> */}
                        {/* <div className="align-self-center" style={{ marginTop: '60px', color:"black" }}>
                            <label className="font-800 font-22 trn Title" data-trn-key="Deposit">User Profile </label>
                        </div> */}
                  <div class="profile-container">
  <div class="profile-header">
    <h2>User Profile</h2>
  </div>

  <div class="profile-table">
    <div class="profile-row">
      <div class="profile-column">
        <label class="input-label">Id</label>
        <input class="input-box" type="text" value={userData.Id} readonly />
      </div>

      <div class="profile-column">
        <label class="input-label">Name</label>
        <input class="input-box" type="text" value={userData.Name} readonly />
      </div>
    </div>

    <div class="profile-row">
      <div class="profile-column">
        <label class="input-label">Username</label>
        <input class="input-box" type="text" value={userData.UId} readonly />
      </div>

      <div class="profile-column">
  <label class="input-label">Email</label>
  <div class="input-wrapper">
    <input class="input-box" type="email" value={userData.Email} readonly />
    <button class="edit-btn" onClick={() => setChangeEmailModal(true)}>
      <i class="bi bi-pencil-fill"></i>
    </button>
  </div>
</div>

    </div>

    <div class="profile-row">
      <div class="profile-column">
        <label class="input-label">Phone</label>
        <div class="input-wrapper">
          <input class="input-box" type="tel" value={userData.Phone} readonly />
          <button class="edit-btn" onClick={() => setChangePhoneModal(true)}>
            <i class="bi bi-pencil-fill"></i>
          </button>
        </div>
      </div>

      <div class="profile-column">
        <label class="input-label">Balance</label>
        <input class="input-box" type="text" value={balance} readonly />
      </div>
    </div>
  </div>

  <div class="action-section">
    <div class="action-row">
      <span>Change Password?</span>
      <button class="action-btn" onClick={() => setChangePasswordModal(true)}>
        <i class="bi bi-pencil-fill"></i>
      </button>
    </div>

    <div class="action-row">
      <span>Set Pin?</span>
      <button class="action-btn" onClick={() => setPinApiModal(true)}>
        <i class="bi bi-pencil-fill"></i>
      </button>
    </div>
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

    )
}

export default UserProfile2;
