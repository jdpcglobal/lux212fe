import React from 'react'
import'./InvitationModal.css'
const InvitionModal = () => {
  return (
    <>
    <div className="offcanvas offcanvas-bottom rounded-m offcanvas-detached bg-theme" id="QrModal" style={{height:"98%"}}>
    <div className="invitation-modal-backdrop6">
      <div className="invitation-modal6">
        <div className="modal-header6">
          <div className="title-container6">
           
            <h1 className="modal-title6">QR Code</h1>
          </div>
          <button className="close-btn6" data-bs-dismiss="offcanvas">
            <i className="bi bi-x-circle-fill" />
          </button>
        </div>
        <img
          src="https://m.kissdiamond.net/invite/87232.png?v=6813"
          className="qr-image"
          alt="QR Code"
        />
        <div className="form-custom">
          <input
            className="invite-link"
            type="text"
            id="invitelink"
            readOnly
            defaultValue="https://kiss1.me/?afid=87232"
          />
        </div>
        <div className="button-row">
          <a
            className="btn6"
            href="/invite/87232.png?v=2077"
            download="kissdiamond_invite"
          >
            Download Image
          </a>
          <button className="btn" id="copy_link">
            Copy Link
          </button>
        </div>
      </div>
    </div>
            </div>
    </>
  )
}

export default InvitionModal
