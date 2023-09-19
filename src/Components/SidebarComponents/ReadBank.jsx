import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import CreateBankAcc from "./CreateBankAcc";
import { Button } from 'reactstrap';
import Table from 'react-bootstrap/Table'; 
import { callPostApi } from "../ApiCaller";
import { MyBankAccounts_Post } from "../ApiConst";


const ReadBank = () => {
    const [MyBank, setMyBank] = useState([]);
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const [drawCount, setDrawCount] = useState(0)

    const getData = () => {
        const formData = new FormData();
        formData.append("Token", loggedInUser?.Token);
        callPostApi(MyBankAccounts_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setMyBank(respObj.data);
            }
        })
        
    }
    //done
    useEffect(() => {
        getData();
    }, [drawCount]);


    //modal box 
    const [CreateBankAccModal, setCreateBankAccModal] = useState(false)
    const cookiesData = new Cookies().get("kisDiamond_LoggedIn");

    const toggleCreateBankAccModal = () => {
        setCreateBankAccModal(false)
    }

    return (
        <>
            <div className="container w-100" style={{ marginTop: "100px" }}>
                <div className="row">
                    <div className="col-md-3">
                    </div>

                    <div className="col-lg-4 offset-sm-1 Roman">
                        <div className="row ">
                            <div className="align-self-center" >
                                <label className="font-800 font-22 trn Title" data-trn-key="Deposit">Bank Accounts </label>
                            </div>

                            {MyBank.length > 0 && MyBank.map((data) =>
                                <div className="">
                                    <Table className="glow-on-hover">
                                        <thead>
                                            <tr className="Tr">
                                                <th className="Td">Bank Name :  {data.BankName}</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="Tr2">
                                                <td className="Td">Acc Number : {data.HolderName}</td>

                                                <td>{
                                                    data.Status === 1 ? <img width="48" height="48" src="https://img.icons8.com/emoji/48/check-mark-button-emoji.png" alt="check-mark-button-emoji" /> : <img width="48" height="48" src="https://img.icons8.com/color/48/close-window.png" alt="close-window" />
                                                }</td>
                                            </tr>
                                            <tr className="Tr">

                                                <td className="Td">Holder Name:{data.AccNumber}</td>

                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            )}



                            <div className="button">
                                <Button outline color="success" onClick={() => setCreateBankAccModal(true)}>
                                    Setup New Bank Account
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
                <CreateBankAcc show={CreateBankAccModal} setDrawCount={setDrawCount} close={toggleCreateBankAccModal} />
            </div>


        </>
    )
}

export default ReadBank;