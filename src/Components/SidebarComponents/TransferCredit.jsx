import React, { useState } from 'react'
import { Button} from 'reactstrap';
import Cookies from 'universal-cookie';
import { useBalance } from './BalanceContext';
const TransferCredit = () => {
    const [data, setData] = useState('');
    const [toUserId, setToUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [pinDigits, setPinDigits] = useState(['', '', '', '']);
    const { updateBalance } = useBalance();

    //***** Transfer Credit Api ******//
    const handleClick = async () => {
        const pinValue = pinDigits.join('');
        const token = new Cookies().get("kisDiamond_LoggedIn")?.Token; // Retrieve Token here
        await TransferCredit(pinValue, token);
    };
    
    const TransferCredit = async (pinValue,token) => {
        let formData = new FormData();
        formData.append('Token', token);
        formData.append('ToUserId', toUserId);
        formData.append('Amount',amount );
        formData.append('Pin', pinValue);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/TransferCredit', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setData(jsonData.data);
                await updateBalance();
                resetForm();
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const resetForm = () => {
        setToUserId('');
        setAmount('');
        setPinDigits(['', '', '', '']);
    };


    const handlePinChange = (index, value) => {
        const newDigits = [...pinDigits];
        newDigits[index] = value;

        if (value === '' && index > 0) {
            // If backspace is pressed and not the first box, focus on the previous input
            const previousInput = document.getElementById(`pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        } else if (index < newDigits.length - 1 && value !== '') {
            // If not the last digit and a value is entered, focus on the next input
            const nextInput = document.getElementById(`pin-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        } else if (index === newDigits.length - 1 && value === '') {
            // If backspace is pressed in the last box, focus on the previous input
            const previousInput = document.getElementById(`pin-input-${index - 1}`);
            if (previousInput) {
                previousInput.focus();
            }
        }
        setPinDigits(newDigits);

        //***** Transfer Credit Api ****** End //
    };

    return (
        <>
            <div id="TransferCredit" style={{height: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <label className="font-800 font-22 trn Title eWallet" data-trn-key="Deposit">Transfer Credit</label>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-10 offset-1">
                                <div className="formbold-input-group">
                                    <label htmlFor="name" className="formbold-form-label eWallet">
                                        To User Id
                                    </label>
                                    <input type="text" placeholder="To User Id" className="formbold-form-input DepositModal" autoComplete="off" value={toUserId}
                                        onChange={(e) => setToUserId(e.target.value)} />
                                </div>

                                <div className="formbold-input-group">
                                    <label htmlFor="name" className="formbold-form-label eWallet">
                                        Amount
                                    </label>

                                    <input type="text" placeholder="Enter Amount" className="formbold-form-input DepositModal" autoComplete="off" value={amount}
                                        onChange={(e) => setAmount(e.target.value)} />
                                </div>

                                <div className="formbold-input-group">
                                    <label htmlFor="name" className="formbold-form-label eWallet">
                                        Pin
                                    </label>
                                    {pinDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            className="pin-input-box DepositModal"
                                            style={{ width: '25px', marginLeft: '30px', textAlign: 'center' }}
                                            autoComplete="off"
                                            value={digit}
                                            id={`pin-input-${index}`}
                                            onChange={(e) => handlePinChange(index, e.target.value)}
                                        />
                                    ))}
                                </div>
                                
                                <Button outline color="warning"  className=" mt-4"  onClick={() => { handleClick(); }}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default TransferCredit
