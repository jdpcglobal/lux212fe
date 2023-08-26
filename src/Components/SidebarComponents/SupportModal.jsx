import React from 'react'

const SupportModal = () => {
    return (
        <>
            {/* SupportModal  */}
            <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme" id="supportmodal" aria-hidden="true">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h1 className="font-700 trn" data-trn-key="Support">Support</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <div className="list-group list-custom list-group-m rounded-xs bg-theme">
                        <a href="#" className="shareToMail list-group-item" >
                            <i className="bi bi-headset color-blue-dark font-16" />
                            <div className="trn" data-trn-key="Live Chat">Live Chat</div>
                            <i className="bi bi-chevron-right pe-1" />
                        </a>
                        <a href="https://t.me/+601172473194" className="shareToMail list-group-item" target="_blank">
                            <i className="bi bi-telegram color-blue-dark font-16" />
                            <div className="trn" data-trn-key="Telegram">Telegram</div>
                            <i className="bi bi-chevron-right pe-1" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportModal
