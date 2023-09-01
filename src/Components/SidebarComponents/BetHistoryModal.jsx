import React, { useState } from 'react'
import { Button } from 'reactstrap';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs';

const BetHistoryModal = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateFromTo, setDateFromTo] = useState('');
    const [history, setHistory] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    });

    //*****  History API  *****/
    const handleGameClick = () => {
        let reqObj = {
            ...history,
        };
        History(reqObj);
    };
    const History = async (reqObj) => {
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('DateFrom', dateFrom);
        formData.append('DateTo', dateFromTo);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/History', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setHistory(jsonData.data);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    //*****  History API END  *****/

    return (
        <>
            <div id="BetHistoryModal" className="offcanvas offcanvas-end bg-theme">
                <div className="content" style={{ margin: "20px 5px 20px 5px" }}>
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
                            <h1 className="font-800 font-22 trn Title" data-trn-key="History">
                                History
                            </h1>
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
                        <Card style={{boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }} className="mb-2">
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
                                                    label="Date To"
                                                    value={dateFrom ? dayjs(dateFrom, 'DD/MM/YYYY').toDate() : null} // Convert the state date to a Date object
                                                    onChange={(date) => setDateFrom(dayjs(date).format('DD/MM/YYYY'))} // Update the state with the selected date
                                                    renderInput={(props) => (
                                                        <input
                                                            {...props}
                                                            value={dateFrom} // Display the state value directly in the input field
                                                            onChange={(e) => setDateFrom(e.target.value)} // Update the state on input change
                                                        />
                                                    )}
                                                    className='rayan'
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
                        <Button outline className='mb-3' color="warning" onClick={handleGameClick}>Submit</Button>
                        <Table striped bordered hover variant="dark" className="table color-theme mb-2 history">
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
                                {history.length > 0 && history.map((data) => (
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


        </>
    )
}

export default BetHistoryModal
