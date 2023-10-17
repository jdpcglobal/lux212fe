import React, { useEffect, useState } from 'react'
import { callPostApiWithoutPayload } from '../ApiCaller'
import * as ApiConst from '../ApiConst';

const Instruction = () => {
    const [instruction, setInstruction] = useState('')

    useEffect(() => {
        Instruction()
    }, [])
    const Instruction = async () => {
        try {
            callPostApiWithoutPayload(ApiConst.Instructions_Post, (jsonData) => {
                if (jsonData.isSuccess) {
                    setInstruction(jsonData.data)
                }
            }, (error) => {

            }
            )
        } catch (error) { }
    }

    return (
        <div className=' TransactionHistory card card-style'>
            <div className="page-content header-clear-medium">
                <div className="card card-style rounded-m">
                    <div className="content">
                        <h3 className="font-800 color-magenta-dark">How To Deposit 如何充值</h3>
                        <div className="divider mt-3 mb-1" />
                        <div className="accordion accordion-m border-0" id="accordion-group-5">

                            {instruction.length > 0 && instruction.map((data) =>
                                <div className="accordion-item">
                                    <button
                                        className="accordion-button px-0 ps-1 collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${data.Id}`}
                                    >
                                        <i className="bi bi-caret-right-fill color-magenta-dark pe-3 font-14" />
                                        <span className="font-600 font-13">
                                            {data.Title}
                                        </span>
                                        <i className="bi bi-arrow-down-short font-20" />
                                    </button>
                                    <div
                                        id={`${data.Id}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordion-group-5"
                                    >
                                        <img
                                            src={data.ImgUrl}
                                            className="lazyload"
                                            alt=""
                                            width="100%"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* <div className="accordion-item">
                                <button
                                    className="accordion-button px-0 ps-1 collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion5-2"
                                >
                                    <i className="bi bi-caret-right-fill color-magenta-dark pe-3 font-14" />
                                    <span className="font-600 font-13">
                                        Method 2 - Instant Top Up 快速上分
                                    </span>
                                    <i className="bi bi-arrow-down-short font-20" />
                                </button>
                                <div
                                    id="accordion5-2"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordion-group-5"
                                >
                                    <img
                                        src="/imagies/download.jpg"
                                        className="lazyload"
                                        alt=""
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button
                                    className="accordion-button px-0 ps-1 collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion5-3"
                                >
                                    <i className="bi bi-caret-right-fill color-magenta-dark  pe-3 font-14" />
                                    <span className="font-600 font-13">Method 3 - 81Pay E-wallet</span>
                                    <i className="bi bi-arrow-down-short font-20" />
                                </button>
                                <div
                                    id="accordion5-3"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordion-group-5"
                                >
                                    <img
                                        src="/imagies/kdm.gif"
                                        className="lazyload"
                                        alt=""
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button
                                    className="accordion-button px-0 ps-1 collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion5-4"
                                >
                                    <i className="bi bi-caret-right-fill color-magenta-dark  pe-3 font-14" />
                                    <span className="font-600 font-13">
                                        Method 4 - E-Wallet 电子钱包
                                    </span>
                                    <i className="bi bi-arrow-down-short font-20" />
                                </button>
                                <div
                                    id="accordion5-4"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordion-group-5"
                                >
                                    <img
                                        src="/imagies/sahil.png"
                                        className="lazyload"
                                        alt=""
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="accordion-item">
                                <button
                                    className="accordion-button px-0 ps-1 collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordion5-5"
                                >
                                    <i className="bi bi-caret-right-fill color-magenta-dark  pe-3 font-14" />
                                    <span className="font-600 font-13">
                                        Method 5 - Bank Transfer 银行转账
                                    </span>
                                    <i className="bi bi-arrow-down-short font-20" />
                                </button>
                                <div
                                    id="accordion5-5"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordion-group-5"
                                >
                                    <img
                                        src="/images/tutorial/bank_transfer.jpg"
                                        className="lazyload"
                                        alt=""
                                        width="100%"
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Instruction
