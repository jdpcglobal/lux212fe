import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { callPostApi } from '../ApiCaller';
import { GetBalance_Post, UserProfile_Post } from '../ApiConst';

const BalanceContext = createContext();

export function useBalance() {
  return useContext(BalanceContext);
}

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState({
    Id: '',
    Name: '',
    UId: '',
    Email: '',
    Phone: '',
    CreditBalance: '',
    ParentId: '',
  });

  const updateBalance = async () => {
    const token = new Cookies().get('kisDiamond_LoggedIn')?.Token;
    let formData = new FormData();
    formData.append('Token', token);
    callPostApi(GetBalance_Post, formData, jsonData => {
      const respObj = jsonData.data.data;
      setBalance(respObj.CreditBalance);
    })

  };

  const UserProfileApi = async () => {
    const token = new Cookies().get('kisDiamond_LoggedIn')?.Token;
    let formData = new FormData();
    formData.append('Token', token);
    callPostApi(UserProfile_Post, formData, jsonData => {
      const respObj = jsonData.data;
      if (respObj.isSuccess) {
        setUserData(respObj.data);
      }
    })
    
  };

  useEffect(() => {
    updateBalance();
    UserProfileApi(); // Call UserProfileApi on component mount
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, updateBalance, userData }}>
      {children}
    </BalanceContext.Provider>
  );
}
