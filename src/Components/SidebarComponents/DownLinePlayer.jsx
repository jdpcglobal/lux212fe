import React from 'react'

const DownLinePlayer = () => {
    return (
        <>
            <div className='card card-style TransactionHistory'>
                <div className="page-content header-clear-medium">
                    <div className="content mt-3">
                        <div className="tabs tabs-box" id="tab-group-1">
                            <div className="tab-controls rounded-s border-highlight">
                                <a
                                    className="font-13 color-highlight collapsed"
                                    data-bs-toggle="collapse"
                                    href="#tab-1"
                                    aria-expanded="true"
                                >
                                    <t data-trn-key="Downline Player">Downline Player</t> (0)
                                </a>
                            </div>
                            <div className="mt-3" />
                            <div
                                className="collapse show"
                                id="tab-1"
                                data-bs-parent="#tab-group-1"
                                style={{}}
                            >
                                <div className="border border-blue-dark rounded-s overflow-hidden" >
                                    <table className="table color-theme border-blue-dark mb-0 text-center">
                                        <thead className="rounded-s bg-blue-dark border-l" >
                                            <tr className="color-white">
                                                <th scope="col" style={{background:"#4A89DC"}}>
                                                    <h5
                                                        className="color-white font-15 mb-0 trn"
                                                        data-trn-key="Register"
                                                    >
                                                        Register
                                                    </h5>
                                                </th>
                                                <th scope="col" style={{background:"#4A89DC"}}>
                                                    <h5
                                                        className="color-white font-15 mb-0 trn"
                                                        data-trn-key="Player"
                                                    >
                                                        Player
                                                    </h5>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "100%", height: "auto" }}></div>
                        {/*-   <div class="row" id="allpromotion">

    <div class="d-flex justify-content-center">
    <div class="spinner-border color-teal-dark" role="status"></div>
    </div>

  </div> -*/}
                    </div>
                </div>

            </div>
        </>
    )
}

export default DownLinePlayer