import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useBalance } from './SidebarComponents/BalanceContext'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    const loggedInUser = new Cookies().get("kisDiamond_LoggedIn")
    const { balance } = useBalance();

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove('kisDiamond_LoggedIn');
        window.location.reload();
    };

    return (
        <>
            <div className="rounded-m pcsidebar pcSidebarSlider">
                <div className="bg-theme mx-3 align-items-center rounded-m shadow-m mt-3 mb-3"
                    style={{ backgroundColor: "black" }}
                >
                    <div className=" pb-2 pt-2" style={{ paddingLeft: '34px' }}>
                        <div className="ps-2 align-self-center">
                            <h5 className="ps-1 mb-0 line-height-xs pt-1">
                                <img src="../imagies/logo.png" style={{ width: 150 }} />
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="bg-theme mx-3 rounded-m shadow-m mt-3 mb-3">
                    <div className="px-2 pb-2 pt-2 userInfo" style={{ marginBottom: '21px' }}>
                        <div className="ps-2 align-self-center">

                            <div
                                className="pc_wallet "
                                onclick="window.location='/gamecredit'"
                            >

                                <div id="nav-comps">
                                    IDR:<span className="wallet">{balance}  </span> &nbsp;&nbsp;
                                    <i
                                        className="bi bi-info-circle"
                                        style={{ color: "#AC92EC !important" }}
                                    />
                                </div>

                            </div>
                            <h5 className="ps-1 mb-0 line-height-xs pt-1">{loggedInUser?.Name}</h5>
                            <h6 className="ps-1 mb-0 font-400 opacity-40" style={{ width: "20%" }}>
                                <span>{loggedInUser?.UId}</span>{" "}
                            </h6>
                        </div>
                    </div>
                </div>
                {/* <span class="menu-divider">NAVIGATION</span> */}
                <div className="menu-list menuList">
                    {loggedInUser && (
                        <div className="card card-style rounded-m p-3 py-2 mb-0 card-styles">
                            <Link to="/UserProfile2" id="nav-bank">
                                <a
                                    href="#"
                                >
                                    <i className="MyProfile shadow-bg shadow-bg-xs bi bi-person" />
                                    <span className="trn" data-trn-key="Deposit">
                                        my Profile
                                    </span>
                                    <i className="bi bi-chevron-right" />
                                </a>
                            </Link>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#QrModal"
                                id="nav-invitation"
                            >
                                <i className="gradient-magenta shadow-bg shadow-bg-xs bi bi-qr-code" />
                                <span className="trn" data-trn-key="Invitation">
                                    Invitation
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#DepositSelectMethod"
                                id="nav-homes"
                            >
                                <i className="gradient-mint shadow-bg shadow-bg-xs bi bi-coin" />
                                <span className="trn" data-trn-key="Deposit">
                                    Deposit
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>
                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#WithdrawMethod"
                                onclick="get_turnover();"
                                id="nav-homes"
                            >
                                <i className="gradient-orange shadow-bg shadow-bg-xs bi bi-box-arrow-up" />
                                <span className="trn" data-trn-key="Withdraw">
                                    Withdraw
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#TransferCredit"
                                id="nav-comps"
                            >
                                <i className="gradient-blues shadow-bg shadow-bg-xs bi bi bi-arrow-left-right" />
                                <span className="trn" data-trn-key="History">
                                    Transfer Credit
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#CreditModal"
                                id="nav-comps"
                            >
                                <i class="gradient-dark shadow-bg shadow-bg-xs bi bi-box2-heart"></i>
                                <span className="trn" data-trn-key="Rewards">
                                    Rewards
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>

                            <a href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#BetHistoryModal"
                                id="nav-comps">
                                <i className="gradient-pink shadow-bg shadow-bg-xs bi bi-clock-history" />
                                <span className="trn" data-trn-key="Promotion">
                                    History
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>
                            {/*<a href="/promotion/" id="nav-comps"><i class="gradient-red shadow-bg shadow-bg-xs bi bi-gift-fill"></i><span class="trn">Reward</span><i class="bi bi-chevron-right"></i></a>*/}

                            {/* <a
                            href="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#HistoryModal"
                            id="nav-comps"
                        >
                            <i className="gradient-brown shadow-bg shadow-bg-xs bi bi-clock-history" />
                            <span className="trn" data-trn-key="History">
                                Transactions
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}

                            <Link to="/TransactionsHistory" id="nav-bank">
                                <a
                                    href="#"
                                    id="nav-comps"
                                >
                                    <i className="gradient-brown shadow-bg shadow-bg-xs bi bi-clock-history" />
                                    <span className="trn" data-trn-key="History">
                                        Transactions
                                    </span>
                                    <i className="bi bi-chevron-right" />
                                </a>
                            </Link>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#BankTransaction"
                                id="nav-comps"
                            >
                                <i className="gradient-blue shadow-bg shadow-bg-xs bi bi bi-bank2" />
                                <span className="trn" data-trn-key="History">
                                    Bank Transaction
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>



                            {/* <Link to="/ReadBank" id="nav-bank">
                            <div id="nav-homes">
                                <i className="gradient-bluess shadow-bg shadow-bg-xs bi bi bi-bank2" />
                                <span className="trn" data-trn-key="Deposit">
                                    Bank Account
                                </span>
                                <i className="bi bi-chevron-right" />
                            </div>
                        </Link> */}

                            <a href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#BankAccounts"
                                id="nav-comps">
                                <i className="gradient-bluess shadow-bg shadow-bg-xs bi bi bi-bank2" />
                                <span className="trn" data-trn-key="Promotion">
                                    Bank Account
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>

                            {/* <a href="/downline/">
                            <i className="gradient-blue shadow-bg shadow-bg-xs bi bi-people-fill" />
                            <span className="trn" data-trn-key="Downline Player">
                                Downline Player
                            </span>
                            <i className="bi bi-chevron-right" />
                        </a> */}

                            <Link to="/DownLinePlayer" id="nav-bank">
                                <a>
                                    <i class="gradient-mint shadow-bg shadow-bg-xs bi bi-people-fill"></i>
                                    <span className="trn" data-trn-key="Instruction">
                                        DownLine Player
                                    </span>
                                    <i className="bi bi-chevron-right" />
                                </a>
                            </Link>
                            <a href="#" id="nav-mails" onclick="switch_lang()">
                                <i className="gradient-teal shadow-bg shadow-bg-xs bi bi-translate" />
                                <span className="trn" data-trn-key="Lang">
                                    Language
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>
                            <Link to="/Instruction" id="nav-bank">
                                <a>
                                    <i className="instruction shadow-bg shadow-bg-xs bi bi-card-image" />
                                    <span className="trn" data-trn-key="Instruction">
                                        Instruction
                                    </span>
                                    <i className="bi bi-chevron-right" />
                                </a>
                            </Link>

                            <Link to="/Promotion" id="nav-bank">
                                <a>
                                    <i class="gradient-red shadow-bg shadow-bg-xs bi bi-gift-fill"></i>
                                    <span className="trn" data-trn-key="Instruction">
                                        Promotion
                                    </span>
                                    <i className="bi bi-chevron-right" />
                                </a>
                            </Link>

                            <a
                                href="#"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#supportmodal"
                                id="nav-support"
                            >
                                <i className="gradient-yellow shadow-bg shadow-bg-xs bi bi-headset" />
                                <span className="trn" data-trn-key="Support">
                                    Support
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>
                            <a id="nav-mails" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                <i className="gradient-dark shadow-bg shadow-bg-xs bi bi-box-arrow-left" />
                                <span className="trn"  >
                                    Logout
                                </span>
                                <i className="bi bi-chevron-right" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sidebar
