import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { callPostApi } from '../ApiCaller';
import { Login_User_Post } from '../ApiConst';
import Button from 'react-bootstrap/Button';
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

    callPostApi(
      Login_User_Post,
      formData,
      (response) => {
        if (response.data?.isSuccess) {
          toast.success(response.data.message);
          props.handleLogin(response.data.data);
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
      <Modal show={props.show} centered={true}>
        <Modal.Body>
          <div className="login-box">
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
                <Button variant="dark" onClick={handleForgetPassword}>Forget</Button> Password
              </div>

              <a >
                <span />
                <span />
                <span />
                <span />
                <Button variant="warning" onClick={handleLogin}>Submit</Button>
              </a>
              <a >
                <span />
                <span />
                <span />
                <span />
                <Button variant="warning" onClick={() => setCreateRegisterModal(true)}>Register</Button>
              </a>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Registration show={CreateRegisterModal} close={toggleCreateRegisterModal} setDrawCount={setDrawCount} />
      <ForgetPassword show={forgetPasswordModal} close={setForgetPasswordModal} setDrawCount={setDrawCount} />
    </>

  );
};

export default Login;
