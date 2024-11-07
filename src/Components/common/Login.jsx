import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { callPostApi } from '../ApiCaller';
import { Login_User_Post } from '../ApiConst';
import { Button } from 'reactstrap';
import Registration from "./Registration";
import ForgetPassword from './ForgetPassword';

const Login = (props) => {
  const [loginObj, setLoginObj] = useState({
    Username: '',
    Password: '',
    IsMobile: true,
  });

  const [CreateRegisterModal, setCreateRegisterModal] = useState(false)
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false)
  const [drawCount, setDrawCount] = useState(0)

  const handleForgetPassword = () => {
    props.hideLoginForm();
    setForgetPasswordModal(true);
  };

  useEffect(() => {
  }, [drawCount]);

  const toggleCreateRegisterModal = () => {
    setCreateRegisterModal(false)
  }
  const handleTextChange = (e) => {
    setLoginObj({
      ...loginObj,
      [e.target.id]: e.target.value,
    });
  };


  const handleLogin = () => {
    if (loginObj.Username === '') {
      toast.error('Username is required');
      return;
    }
    const formData = new FormData();
    formData.append('Username', loginObj.Username);
    formData.append('Password', loginObj.Password);

    callPostApi(Login_User_Post, formData, (response) => {
      if (response.data?.isSuccess) {
        toast.success(response.data.message);
        props.handleLogin(response.data.data);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    },
      (error) => {
        toast.error(error);
      }
    );
  };

  return (
    <>
      <Modal size='sm' show={props.show} centered={true}>
        <Modal.Body className='RegisterName'>
          {/* <div className="login-box">
            <h2>Login</h2>
            <form>
              <div className="user-box">
                <input type="text" name="" required="" id="Username" autoComplete='off' value={loginObj.Username}
                  onChange={handleTextChange} />
                <label>Username</label>
              </div>
              <div className="user-box">
                <input type="password" name="" required="" id="Password" value={loginObj.Password}
                  onChange={handleTextChange} />
                <label>Password</label>
                <Button outline color="success" onClick={handleLogin}>Submit</Button>
              </div>
              <a>
              <Button variant="dark" onClick={handleForgetPassword}>Forget Password</Button> 
              </a>
              <a>
                <Button outline color="success" onClick={() => setCreateRegisterModal(true)}>Register</Button>
              </a>
            </form>
          </div> */}


          <div className="content">
            <div className="d-flex pb-2">
              <div className="align-self-center">
              <div className="align-self-center ms-auto mb-2">
                <a
                  href="#"
                  className="btn btn-xxs gradient-night"
                  onclick="switch_lang()"
                  style={{color:"white"}}
                >
                  <i className=" bi bi-translate"  /> 中文 / EN
                </a>
              </div>
                <h1 className="font-800 font-22 trn" data-trn-key="Login">
                  Login
                </h1>
              </div>
             
            </div>

            <form
              action="#"
              onsubmit="return login_submit(this)"
              method="post"
              id="login_form"
            >
              <div className="form-custom form-label form-border form-icon mb-3 bg-">
                <i className="bi bi-person-circle font-13" />
               
                <div className="" style={{ display: "inline" }}>
                  <input
                    name="player"
                    type="text"
                    className="form-control rounded-xs"
                    id="Username"
                    autoComplete="off"
                    placeholder="User Name"
                    
                    required=""
                   
                    value={loginObj.Username}
                    onChange={handleTextChange}
                  />
                  <label
                    htmlFor="phone_number"
                    className="color-theme trn"
                    data-trn-key="Phone"
                  >
                    Phone
                  </label>
                  <span className="trn" data-trn-key="(required)">
                    (required)
                  </span>
                </div>
              </div>
              <div className="form-custom form-label form-border form-icon mb-4 bg-transparent">
                <i className="bi bi-asterisk font-13" />
                <input
                  name="pwd"
                  type="password"
                  className="form-control rounded-xs"
                  id="Password"
                  placeholder="Password"
                  autoComplete="false"
                  required=""
                  data-ph-trn-key="Password"
                  fdprocessedid="bhlq6f"
                  value={loginObj.Password}
                  onChange={handleTextChange}
                />
                <label
                  htmlFor="login_pwd"
                  className="color-theme trn"
                  data-trn-key="Password"
                >
                  Password
                </label>
                <span className="trn" data-trn-key="(required)">
                  (required)
                </span>
              </div>

              <Button className='btn btn-full gradient-blue shadow-bg shadow-bg-s mt-1 button_100 trn' onClick={handleLogin}>Submit</Button>
            </form>
            <div className="row">
              <div className="col-6 text-start">
                <a
                  href="#"
                  // data-bs-toggle="offcanvas"
                  // data-bs-target="#ForgotPasswordModal"
                  className="font-11 color-theme opacity-90 pt-3 d-block trn "
                  // data-trn-key="Forgot Password?"
                  onClick={handleForgetPassword}
                >
                  Forgot Password?
                  {/* <Button  onClick={handleForgetPassword}>Forget Password</Button> */}
                </a>
              </div>
              <div className="col-6 text-end">
                <a
                  href="#"
                  className="font-14 color-theme opacity-90 pt-3 d-block trn"
                  onClick={() => setCreateRegisterModal(true)}
                >
                  Register
                </a>
              </div>
            </div>
          </div>


        </Modal.Body>
      </Modal>
      <Registration show={CreateRegisterModal} close={toggleCreateRegisterModal} setDrawCount={setDrawCount} />
      <ForgetPassword show={forgetPasswordModal} close={setForgetPasswordModal} setDrawCount={setDrawCount} />
    </>

  );
};

export default Login;
