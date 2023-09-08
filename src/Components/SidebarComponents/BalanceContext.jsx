import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

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
    try {
      const response = await fetch('https://lux212.azurewebsites.net/Api/GetBalance', {
        method: 'POST',
        body: formData,
      });
      const dataS = await response.json();
      console.log('API Response (Balance):', dataS);
      setBalance(dataS.data.CreditBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const UserProfileApi = async () => {
    const token = new Cookies().get('kisDiamond_LoggedIn')?.Token;
    let formData = new FormData();
    formData.append('Token', token);
    try {
      const response = await fetch('https://lux212.azurewebsites.net/Api/UserProfile', {
        method: 'POST',
        body: formData,
      });
      const jsonData = await response.json();
      console.log('API Response (UserProfile):', jsonData);
      if (jsonData.isSuccess) {
        setUserData(jsonData.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
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
