import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/common/Login";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import RouterConfig from "./RouterConfig";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js";
import Registration from "./Components/common/Registration";


// import { Toaster } from 'react-hot-toast';

const MyApp = () => {
  const [drawCount, setDrawCount] = useState(0)
  const cookies = new Cookies();
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleLogin = (data) => {
    cookies.set("kisDiamond_LoggedIn", data)
    setDrawCount(pre => pre + 1)
  }
  
  useEffect(() => {
    if (cookies.get("kisDiamond_LoggedIn") === undefined) {
      setShowLoginForm(true)
    } else {
      setShowLoginForm(false)
    }
  }, [])

  

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
      <Login show={showLoginForm} handleLogin={handleLogin} hideLoginForm={toggleLoginForm} drawCount={setDrawCount} />
      <Registration />
      {/* <RouteConfig /> */}
      <RouterConfig />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      {/* <Toaster /> */}
    </>
  )
}

export default MyApp;