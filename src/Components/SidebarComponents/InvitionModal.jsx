import React from 'react'

const InvitionModal = () => {
  return (
    <>
    <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme" id="QrModal">
                <div className="content">
                    <div className="d-flex pb-2">
                        <div className="align-self-center">
                            <h5 className="mb-n1 font-12 color-highlight font-700 text-uppercase pt-1 trn" data-trn-key="Invitation">Invitation</h5>
                            <h1 className="font-700 trn" data-trn-key="Qrcode">Qrcode</h1>
                        </div>
                        <div className="align-self-center ms-auto">
                            <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m"><i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" /></a>
                        </div>
                    </div>
                    <img src="https://m.kissdiamond.net/invite/87232.png?v=6813" className="generate-qr-auto mx-auto my-3" alt="" style={{ maxWidth: '100%' }} />
                    <div className="form-custom form-label mb-3 bg-transparent">
                        <input className="form-control rounded-xs" style={{ textAlign: 'center' }} type="text" id="invitelink" readOnly defaultValue="https://kiss1.me/?afid=87232" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <a className="default-link btn btn-full btn-s gradient-green shadow-bg shadow-bg-s trn" href="/invite/87232.png?v=2077" download="kissdiamond_invite" data-trn-key="Download Image">Download Image</a>
                        </div>
                        <div className="col-6">
                            <a className="default-link btn btn-full btn-s gradient-green shadow-bg shadow-bg-s trn copy_afidbtn" id="copy_link" data-trn-key="Copy Link">Copy Link</a>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default InvitionModal
