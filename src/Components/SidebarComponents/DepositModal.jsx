import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Loader from '../common/Loader';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; // Assuming you are using reactstrap for modals
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';


const DepositModal = () => {
    const [bankName, setBankName] = useState([]);
    const [HolderName, setHolderName] = useState([]);
    const [AccNumber, setAccNumber] = useState([]);
    const [creditAccount, setCreditAccount] = useState([]);
    const [UploadReceipt, setUploadReceipt] = useState("")
    const [amount, setAmount] = useState('');
    const [launchGameReqObj, setLaunchGameReqObj] = useState({
        Token: new Cookies().get("kisDiamond_LoggedIn")?.Token,
    })
    const [selectedBank, setSelectedBank] = useState({
        AccNumber: "",
        BankName: "",
        HolderName: "",
        Id: "",
        ImageUrl: "",
        IsDefault: true,
        Status: "",
        UserId: "",
    });

    const [bankNamesLoader, setBankNamesLoader] = useState(false)
    const [message, setMessage] = useState({
        Id: "",
        UserId: "",
        TrId: "",
        Amount: "",
        Method: "",
        Type: "",
        Created: "",
        Currency: "",
        BankAccountId: "",
        VerifyStatus: ""
    });
    const [messageType, setMessageType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onlineMethod, setOnlineMethod] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, setSelectedName] = useState('');
    const [deposit, setDeposit] = useState({
        InvoiceUrl: "",
    });

    //***** CreditAccount *****/
    const CreditAccount = async (payloadType) => {
        let reqObj = {
            ...launchGameReqObj,
            Type: payloadType === "EWallet" ? "2" : "1"
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Type', reqObj?.Type);
        try {
            setBankNamesLoader(true)
            const response = await fetch('https://lux212.azurewebsites.net/Api/CreditAccount', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setCreditAccount(jsonData.data);
                const selectedItem = jsonData.data[0]; // Assuming the first item is selected
                setBankName(selectedItem.BankName);
                setHolderName(selectedItem.HolderName);
                setAccNumber(selectedItem.AccNumber);
                setBankNamesLoader(false)
            }
        } catch (error) {
            setBankNamesLoader(false)
            console.log('Error:', error);
        }
    };

    const handleItemClick = (itemId) => {
        const selectedItem = creditAccount.find((item) => item.Id === itemId);
        setSelectedBank(selectedItem);
        setBankName(selectedItem.BankName);
        setHolderName(selectedItem.HolderName);
        setAccNumber(selectedItem.AccNumber);
    };
    //***** CreditAccount END *****/

    //***** Online Payment Method *****//

    const handleOnlineClick = (id, name) => {
        setSelectedId(id);
        setSelectedName(name);
        OnlinePayment()
        // Call the online payment method here if needed
    };
    const OnlinePayment = async () => {
        let reqObj = {
            ...launchGameReqObj,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Pay/PaymentGateways', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setOnlineMethod(jsonData.data); // Return the message from the API response
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    //***** Online Payment Method End *****//

    //***** Online Deposit *****//

    const handleDepositClick = () => {
        DepositApi()
    };
    const DepositApi = async () => {
        let reqObj = {
            ...launchGameReqObj,
        };
        let formData = new FormData();
        formData.append('Token', reqObj?.Token);
        formData.append('Amount', amount);
        formData.append('Gateway', selectedName);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Pay/Deposit', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
            if (jsonData.isSuccess) {
                window.open(jsonData.data.InvoiceUrl).focus();
                setDeposit(jsonData.data);

            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    //***** Online Deposit End *****//

    //***** UPLOAD RECEIPTS *****/
    const UploadReceipts = async (file) => {
        let formData = new FormData();
        formData.append('key', 'KYhpThsnejTYmofkOndfmkQnci0');
        formData.append('img', file); // Append the selected file to the form data
        try {
            const response = await fetch('https://www.jdpcglobal.com/cdn/api/uploadReceipts.php', {
                method: 'POST',
                body: formData,

                contentType: 'application/json',
                Type: 'json'
            });
            const jsonData = await response.json();
            console.log("jsonData.data ===== ", jsonData);
            if (jsonData.isSuccess) {
                setUploadReceipt(jsonData.url);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        UploadReceipts(file);
    };
    //***** UPLOAD RECEIPTS END *****/

    //***** SAVE CREDIT INFO *****/
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSaveClick = async () => {
        const success = await SaveBankAcc();
        if (success) {
            setIsModalOpen(true);
        }
    };
    const SaveBankAcc = async () => {
        let formData = new FormData();
        formData.append('Amount', amount);
        formData.append('ReceiptUrl', UploadReceipt);
        formData.append('UserId', `16`);
        formData.append('DestBankId', selectedBank.Id);
        try {
            const response = await fetch('https://lux212.azurewebsites.net/Api/SaveCreditInfo', {
                method: 'POST',
                body: formData,
            });
            const jsonData = await response.json();
            if (jsonData.isSuccess) {
                setMessage(jsonData.data); // Return the message from the API response
            }
            toast(jsonData.message, {
                type: jsonData.isSuccess ? 'success' : 'error',
            });
        } catch (error) {
            console.log('Error:', error);
        }
    };

    //***** SAVE SAVE CREDIT INFO END *****/
    return (
        <>
            {/* Deposit Modal */}
            <div id="DepositSelectMethod" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Deposit">Deposit</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="list-group list-custom list-group-m rounded-xs">
                        {/*<a href="#" class="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#PaymentGwModal">*/}
                        {/* <a href="#" className="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#DGPayModal">
                            <img src="https://m.kissdiamond.net/images/dgpay.png" className="rounded-xs" alt="DGpay" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <div><strong><t data-trn-key="Instant top-up">Instant top-up</t> 🚀</strong></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#FpayModal">
                            <i className="has-bg bg-yellow-dark rounded-xs bi bi-credit-card-2-back-fill" />
                            <div><strong><t data-trn-key="Instant Top-up">Instant Top-up</t> 🌪</strong></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item " data-bs-toggle="offcanvas" data-bs-target="#pay81Modal">
                            <img src="https://m.kissdiamond.net/images/81pay.png" className="rounded-xs" alt="81pay" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <div><strong><t data-trn-key="81PAY Deposit">81PAY Deposit</t>  <small className=" opacity-30">— </small><small> 5 ⭐ <t data-trn-key="Reviews">Reviews</t></small></strong></div>
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#FPX_EwalletModal">
                            <img src="https://m.kissdiamond.net/images/fpx.png" className="rounded-xs" alt="FPX_EWALLET" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <img src="	https://m.kissdiamond.net/images/tng.jpg" className="rounded-xs" alt="FPX_EWALLET" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <img src="https://m.kissdiamond.net/images/boost.jpg" className="rounded-xs" alt="FPX_EWALLET" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <img src="	https://m.kissdiamond.net/images/grab.jpg" className="rounded-xs" alt="FPX_EWALLET" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <img src="	https://m.kissdiamond.net/images/presto.jpg" className="rounded-xs" alt="FPX_EWALLET" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <i className="bi bi-chevron-right" />
                        </a>
                        <a href="#" className="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#UsdtModal">
                            <img src="https://m.kissdiamond.net/images/usdt.png" className="rounded-xs" alt="Usdt" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                            <div><strong><t data-trn-key="USDT Deposit">USDT Deposit</t></strong></div>
                            <i className="bi bi-chevron-right" />
                        </a> */}

                        <a onClick={() => CreditAccount('EWallet')} className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#EWallet">
                            <i className="has-bg bg-red-darks rounded-xs bi bi-wallet2" />
                            <div className='eWallet'>E Wallet</div>
                            <i className="bi bi-chevron-right" />
                        </a>

                        <a onClick={() => CreditAccount()} className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#SelectBank">
                            <i className="has-bg bg-red-dark rounded-xs bi bi-bank2" />
                            <div className='eWallet'>Bank Transfer</div>
                            <i className="bi bi-chevron-right" />
                        </a>

                        <div className="AlignSelf">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Deposit"> Payment Get Ways</h1>
                        </div>
                        <a onClick={() => handleOnlineClick()} className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#OnlinePayment">
                            <i className="has-bg bg-red-darkss rounded-xs bi bi-cash-stack" />
                            <div className='eWallet'>Bank Transfer</div>
                            <i className="bi bi-chevron-right" />
                        </a>

                    </div>
                </div>
            </div>
            {/* Deposit Modal End */}

            {/* E wallet Modal */}
            <div id="EWallet" style={{ width: '100%' }} className="offcanvas offcanvas-bottom bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Select Bank">Select Payment Method</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    {/*- bank config-*/}
                    {bankNamesLoader ? <Loader /> :
                        <>
                            {creditAccount.length > 0 && creditAccount.map((data) =>
                                <div className="list-group list-custom list-group-m rounded-xs " onClick={() => handleItemClick(data.Id)}>
                                    <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#EWalletModal">
                                        <img src={data.ImageUrl} className="rounded-xs" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                                        <div class="eWallet">{data.BankName}</div>
                                        <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            )}
                        </>}
                </div>
            </div>
            {/* E wallet Modal End */}

            {/* Online Payment Modal */}
            <div id="OnlinePayment" style={{ width: '100%' }} className="offcanvas offcanvas-bottom bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Select Bank">Select Payment Method</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    {/*- bank config-*/}
                    {bankNamesLoader ? <Loader /> :
                        <>
                            {onlineMethod.length > 0 && onlineMethod.map((data) => (
                                <div className="list-group list-custom list-group-m rounded-xs" key={data.Id}>
                                    <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#OnlinePaym"
                                        onClick={() => handleOnlineClick(data.Id, data.Name)}>
                                        <img src={data.ImageUrl} className="rounded-xs"
                                            style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                                        <div class="eWallet"    >{data.Name}</div>
                                        <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            ))}
                        </>}
                </div>
            </div>
            {/* Online Payment Modal End */}

            <div id="SelectBank" style={{ width: '100%' }} className="offcanvas offcanvas-bottom bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-800 font-22 trn Title" data-trn-key="Select Bank">Select Bank</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    {/*- bank config-*/}
                    {bankNamesLoader ? <Loader /> :
                        <>
                            {creditAccount.length > 0 && creditAccount.map((data) =>
                                <div className="list-group list-custom list-group-m rounded-xs " onClick={() => handleItemClick(data.Id)}>
                                    <a href="#" className="list-group-item DepositModal" data-bs-toggle="offcanvas" data-bs-target="#IN-AMBmodal">
                                        <img src={data.ImageUrl} className="rounded-xs" style={{ width: '32px', height: '32px', marginRight: '15px' }} />
                                        <div class="eWallet">{data.BankName}</div>
                                        <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            )}
                        </>}
                </div>
            </div>

            <div id="IN-AMBmodal" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn BankTransfer" data-trn-key="Bank Transfer">Bank Transfer</h5>
                            <h1 className="font-800 font-22 Title">{bankName}</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="divider bg-green-dark divider-icon divider-s"><i className="bi bi-bank font-28 bg-green-dark rounded-xl" /></div>
                    <form method="post" encType="multipart/form-data" onsubmit="deposit_submit(this)" style={{ border: '0px', padding: 0 }}>
                        {/*-- bank config */}
                        <input type="hidden" name="bank" defaultValue="IN-AMB/8881048199113" required />
                        <div className="card card-style BankHolderN" style={{ marginBottom: '10px' }}>
                            <div className="content text-center">
                                <h4>Bank Name: {bankName}</h4>
                                <h4>Holder Name: {HolderName}</h4>
                                <h4>Acc Number: {AccNumber}</h4>
                            </div>
                        </div>
                        {/*-- bank config */}
                        <div className="file-data mt-1 mb-2 text-center">
                            <small className="badge gradient-yellow color-black">亲爱的用户我们只接受INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">备注请写上账号 勿使用GIRO/IBG转账</small><br />
                            <small className="badge gradient-yellow color-black">Dear user, we accept only INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">Fill your User ID on reference.  Do not use GIRO/IBG Bank transfer</small><br />
                            <div id="imgupload" className="img-fluid rounded-s" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            </div>
                            <span className="upload-file-name d-block text-center" data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:" data-text-after=" is ready.">
                            </span>
                            <div>
                                <div>
                                    <input className="btn btn-full btn-primary btn-m text-uppercase font-700 rounded-s upload-file-text bg-dark trn" type="file" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-coin font-13" />
                            <input type="number" className="form-control rounded-xs trn rounded-xss" name="amount" placeholder="Please indicate amount" min={20} required data-trn-key data-ph-trn-key="Please indicate amount"
                                value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <label htmlFor="amount" className="color-theme">Amount</label>
                            <span className="trn" data-trn-key="(<t>minimum</t> RM20)">(<t data-trn-key="minimum">minimum</t> RM20)</span>
                        </div>
                        <span id="message" />
                        <center><Button outline color="warning" className='m-3' onClick={() => { toggleModal(); handleSaveClick(); }}>SUBMIT</Button>
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                </div>
                            )}
                            <ToastContainer /></center>
                    </form>
                </div>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalBody>
                        {/* Add your modal content here */}
                        <div className="Title" style={{ fontWeight: '700', width: '8rem' }}>Your Detail</div>
                        <div className="container">
                            <div className="row">
                                <Table striped bordered hover variant="dark">
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Id</td>
                                            <td>{message.Id}</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>User Id</td>
                                            <td>{message.UserId}</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Tr Id</td>
                                            <td>{message.TrId}</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Amount</td>
                                            <td>{message.Amount}</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Method</td>
                                            <td>{message.Method}</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>Type</td>
                                            <td>{message.Type}</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>Created</td>
                                            <td>{message.Created}</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>Currency</td>
                                            <td>{message.Currency}</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>Status</td>
                                            <td>{message.Status}</td>
                                        </tr>
                                        <tr>
                                            <td>10</td>
                                            <td>BankAccountId</td>
                                            <td>{message.BankAccountId}</td>
                                        </tr>
                                        <tr>
                                            <td>11</td>
                                            <td>VerifyStatus</td>
                                            <td>{message.VerifyStatus}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <Button color="warning" outline onClick={toggleModal}>Close</Button>
                    </ModalBody>
                </Modal>
            </div>

            <div id="EWalletModal" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn BankTransfer" data-trn-key="Bank Transfer">Bank Transfer</h5>
                            <h1 className="font-800 font-22  Title">{bankName}</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="divider bg-green-dark divider-icon divider-s"><i className="bi bi-bank font-28 bg-green-dark rounded-xl" /></div>
                    <form method="post" encType="multipart/form-data" onsubmit="deposit_submit(this)" style={{ border: '0px', padding: 0 }}>
                        {/*-- bank config */}
                        <input type="hidden" name="bank" defaultValue="IN-AMB/8881048199113" required />
                        <div className="card card-style BankHolderN" style={{ marginBottom: '10px' }}>
                            <div className="content text-center">
                                <h4>Bank Name: {bankName}</h4>
                                <h4>Holder Name: {HolderName}</h4>
                                <h4>Acc Number: {AccNumber}</h4>
                            </div>
                        </div>
                        {/*-- bank config */}
                        <div className="file-data mt-1 mb-2 text-center">
                            <small className="badge gradient-yellow color-black">亲爱的用户我们只接受INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">备注请写上账号 勿使用GIRO/IBG转账</small><br />
                            <small className="badge gradient-yellow color-black">Dear user, we accept only INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">Fill your User ID on reference.  Do not use GIRO/IBG Bank transfer</small><br />
                            <div id="imgupload" className="img-fluid rounded-s" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            </div>
                            <span className="upload-file-name d-block text-center" data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:" data-text-after=" is ready.">
                            </span>
                            <div>
                                <div>
                                    <input className="btn btn-full btn-primary btn-m text-uppercase font-700 rounded-s upload-file-text bg-dark trn" type="file" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-coin font-13" />
                            <input type="number" className="form-control rounded-xs trn rounded-xss" name="amount" placeholder="Please indicate amount" min={20} required data-trn-key data-ph-trn-key="Please indicate amount"
                                value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <label htmlFor="amount" className="color-theme">Amount</label>
                            <span className="trn" data-trn-key="(<t>minimum</t> RM20)">(<t data-trn-key="minimum">minimum</t> RM20)</span>
                        </div>
                        <span id="message" />
                        <center><Button outline color="warning" className='m-3' onClick={() => { toggleModal(); handleSaveClick(); }}>SUBMIT</Button>
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                </div>
                            )}
                            <ToastContainer /></center>
                    </form>
                </div>
            </div>

            {/* OnlinePayment Modal */}
            <div id="OnlinePaym" style={{ width: '100%' }} className="offcanvas offcanvas-end bg-theme">
                <div className="content">
                    <div className="d-flex pb-2">
                        {onlineMethod.map((data) => (
                            selectedId === data.Id && (
                                <div className="align-self-center">
                                    <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1 trn BankTransfer" data-trn-key="Bank Transfer">Bank Transfer</h5>
                                    <h1 className="font-800 font-22 Title">{data.Name}</h1>
                                </div>
                            )
                        ))}
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="divider bg-green-dark divider-icon divider-s"><i className="bi bi-bank font-28 bg-green-dark rounded-xl" /></div>
                    <form method="post" encType="multipart/form-data" onsubmit="deposit_submit(this)" style={{ border: '0px', padding: 0 }}>
                        {/*-- bank config */}
                        <input type="hidden" name="bank" defaultValue="IN-AMB/8881048199113" required />
                        <div className="card card-style DepositModal" style={{ marginBottom: '10px' }}>
                            {onlineMethod.map((data) => (
                                selectedId === data.Id && (
                                    <div className="content text-center" key={data.Id}>
                                        <h4> Name: {data.Name} </h4>
                                    </div>
                                )
                            ))}
                        </div>
                        {/*-- bank config */}
                        <div className="file-data mt-1 mb-2 text-center">
                            <small className="badge gradient-yellow color-black">亲爱的用户我们只接受INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">备注请写上账号 勿使用GIRO/IBG转账</small><br />
                            <small className="badge gradient-yellow color-black">Dear user, we accept only INSTANT TRANSFER</small><br />
                            <small className="badge gradient-yellow color-black">Fill your User ID on reference.  Do not use GIRO/IBG Bank transfer</small><br />
                            <div id="imgupload" className="img-fluid rounded-s" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            </div>
                            <span className="upload-file-name d-block text-center" data-text-before="<i class='bi bi-check-circle-fill color-green-dark pe-2'></i> Image:" data-text-after=" is ready.">
                            </span>
                            <div>
                            </div>
                        </div>

                        <div className="form-custom form-label form-border form-icon mb-3 bg-transparent">
                            <i className="bi bi-coin font-13" />
                            <input type="number" className="form-control rounded-xs rounded-xss trn" name="amount" placeholder="Please indicate amount" min={20} required data-trn-key data-ph-trn-key="Please indicate amount"
                                value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <label htmlFor="amount" className="color-theme">Amount</label>
                            <span className="trn" data-trn-key="(<t>minimum</t> RM20)">(<t data-trn-key="minimum">minimum</t> RM20)</span>
                        </div>
                        <span id="message" />
                        <center><Button outline color="warning" className='m-3' onClick={() => { handleDepositClick(); }}>SUBMIT</Button>
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                </div>
                            )}
                            <ToastContainer /></center>
                    </form>
                </div>
            </div>
            {/* OnlinePayment Modal End */}
        </>
    )
}
export default DepositModal