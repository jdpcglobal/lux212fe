import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Button } from 'reactstrap';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';
import { callPostApi } from '../ApiCaller';
import { Transactions_Post } from '../ApiConst';

const HistoryModal = () => {
    const [transactionsReqObj, setTransactionsReqObj] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })
    const [dateFrom, setDateFrom] = useState('');
    const [dateFromTo, setDateFromTo] = useState('');
    const [transaction, setTransaction] = useState('');

    //*****  Transactions API  *****/

    const handleGameClick = () => {
        let reqObj = {
            ...transactionsReqObj,
        };
        Transactions(reqObj);
    };

    const Transactions = async (reqObj) => {
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('DateFrom', dateFrom);
        formData.append('DateTo', dateFromTo);
        callPostApi(Transactions_Post, formData, jsonData => {
            const respObj = jsonData.data;
            if (respObj.isSuccess) {
                setTransaction(respObj.data);
            }
        })
        
    };
    //*****  Transactions API END  *****/

    return (
        <>
            {/* History Modal  */}

            <div id="HistoryModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content" style={{ margin: "20px 5px 20px 5px" }}>
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <label className="font-800 font-22 trn Title" data-trn-key="History">
                                Transaction
                            </label>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
                            </a>
                        </div>
                    </div>
                    <style
                        media="screen"
                        dangerouslySetInnerHTML={{
                            __html:
                                "\n    .history td{\n      line-height: 15px;\n      text-align: center;\n      vertical-align: middle;\n      padding-left: 2px;\n      padding-right:2px;\n    }\n    .history th{\n      padding-left: 2px;\n      padding-right:2px;\n      text-align: center;\n\n    }\n    .Deposit {\n      color:#60ADFF;\n    }\n    .Withdraw {\n      color:#FF4B23;\n    }\n    .Rebate{\n      color:#8CC152;\n    }\n    "
                        }}
                    />
                    <div className="table-responsive">
                        <Card style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }} className="mb-2">
                            <ListGroup variant="flush ">
                                <ListGroup.Item className='listGroup'>
                                    <div className="row BankName">
                                        <div className="col-4 CardFont">
                                            Date From :
                                        </div>

                                        <div className="col-7">
                                            {/* <input type="" value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)} /> */}
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                <DatePicker
                                                    className='rayan'
                                                    label="Date To"
                                                    value={dateFrom ? dayjs(dateFrom, 'DD/MM/YYYY').toDate() : null} // Convert the state date to a Date object
                                                    onChange={(date) => setDateFrom(dayjs(date).format('DD/MM/YYYY'))} // Update the state with the selected date
                                                    renderInput={(props) => (
                                                        <input className='sahil'
                                                            {...props}
                                                            value={dateFrom} // Display the state value directly in the input field
                                                            onChange={(e) => setDateFrom(e.target.value)} // Update the state on input change
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item className='listGroup'>
                                    <div className="row BankName">
                                        <div className="col-4 CardFont">
                                            Date To :
                                        </div>

                                        <div className="col-7">
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                <DatePicker
                                                    label="Date From"
                                                    value={dateFromTo ? dayjs(dateFromTo, 'DD/MM/YYYY').toDate() : null} // Convert the state date to a Date object
                                                    onChange={(date) => setDateFromTo(dayjs(date).format('DD/MM/YYYY'))} // Update the state with the selected date
                                                    renderInput={(props) => (
                                                        <input
                                                            {...props}
                                                            value={dateFromTo} // Display the state value directly in the input field
                                                            onChange={(e) => setDateFromTo(e.target.value)} // Update the state on input change
                                                        />
                                                    )}
                                                    className='rayan'
                                                />
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        <Button outline className='mb-3'  color="success" onClick={handleGameClick}>Submit</Button>
                        <Table className="table color-theme mb-2 history">
                            <thead>
                                <tr>
                                    <th className="border-fade-blue" scope="col" style={{ width: 55 }}>
                                        <small className="trn" data-trn-key="Datetime">
                                            Datetime
                                        </small>
                                    </th>
                                    <th className="border-fade-blue" scope="col">
                                        <small className="trn" data-trn-key="Type">
                                            Type
                                        </small>
                                    </th>
                                    <th className="border-fade-blue" scope="col">
                                        <small className="trn" data-trn-key="Method">
                                            Method
                                        </small>
                                    </th>
                                    <th className="border-fade-blue" scope="col">
                                        <small className="trn" data-trn-key="Amount">
                                            Amount
                                        </small>
                                    </th>

                                    <th className="border-fade-blue" scope="col">
                                        <small className="trn" data-trn-key="Status">
                                            Status
                                        </small>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.length > 0 && transaction.map((data) => (
                                    <tr className="border-fade-blue">
                                        <td>
                                            <small>
                                                <small>
                                                    <small>{data.Date}</small>
                                                </small>
                                            </small>
                                        </td>
                                        <td>
                                            <small>
                                                <small className="trn Deposit" data-trn-key="Deposit">
                                                    {data.Type}
                                                </small>
                                            </small>
                                        </td>
                                        <td>
                                            <small>
                                                <small className=" ">Bank-Transfer</small>
                                            </small>
                                        </td>
                                        <td>
                                            <small>{(data.Amount).toFixed(2)}</small>
                                        </td>

                                        <td className="text-center">
                                            <i className="bi  bi-x-octagon color-red-dark" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>

            {/* History Modal End */}


        </>
    )
}

export default HistoryModal
