import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const BalanceContext = createContext();

export function useBalance() {
    return useContext(BalanceContext);
}

export function BalanceProvider({ children }) {
    const [balance, setBalance] = useState(0);

    const [launchGameReqObj, setLaunchGameReqObj] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    // Function to update the balance using the GetBalance API
    
    const updateBalance = async () => { 
        const token = new Cookies().get("kisDiamond_LoggedIn")?.Token;
        let formData = new FormData();
        formData.append('Token', token);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/GetBalance', {
                method: 'POST',
                body: formData,
            });
            const dataS = await response.json();
            console.log('API Response:', dataS); // Log the entire API response
            setBalance(dataS.data.CreditBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    // Call updateBalance on component mount to initialize balance
    useEffect(() => {
        updateBalance();
    }, []);

    return (
        <BalanceContext.Provider value={{ balance, updateBalance }}>
            {children}
        </BalanceContext.Provider>
    );
}
