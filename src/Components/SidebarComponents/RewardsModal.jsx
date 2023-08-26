import React from 'react'

const RewardsModal = () => {
  return (
    <>
      {/* Creadit modal */}
      <div id="CreditModal" className="offcanvas offcanvas-end bg-theme">
        <div className="content">
          <div className="d-flex pb-2">
            <div className="align-self-center">
              {/* <h5 class="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">Deposit</h5> */}
              <h1 className="font-800 font-22 trn" data-trn-key="Rewards">
                Rewards
              </h1>
            </div>
            <div className="align-self-center ms-auto">
              <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4" />
              </a>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table color-theme mb-2">
              <thead>
                <tr>
                  <th
                    className="border-fade-blue trn"
                    scope="col"
                    data-trn-key="Date"
                  >
                    Date
                  </th>
                  <th
                    className="border-fade-blue trn"
                    scope="col"
                    data-trn-key="Amount"
                  >
                    Amount
                  </th>
                  <th
                    className="border-fade-blue trn"
                    scope="col"
                    data-trn-key="Status"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <div className="col-12 text-end"></div>
          </div>
        </div>
      </div>

      <div id="CreditModal" className="offcanvas offcanvas-end bg-theme">
        <div className="content">
          <div className="d-flex pb-2">
            <div className="align-self-center">
              {"{"}/*{" "}
              <h5 className="mb-n2 font-12 color-highlight font-700 text-uppercase pt-1">
                Deposit
              </h5>{" "}
              */{"}"}
              <h1 className="font-800 font-22 trn" data-trn-key="Rewards">
                Rewards
              </h1>
            </div>
            <div className="align-self-center ms-auto">
              <a href="#" data-bs-dismiss="offcanvas" className="icon icon-m">
                <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4"></i>
              </a>
              <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4"></i>
            </div>
            <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4"></i>
          </div>
          <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4">
            <div className="table-responsive">
              <table className="table color-theme mb-2">
                <thead>
                  <tr>
                    <th
                      className="border-fade-blue trn"
                      scope="col"
                      data-trn-key="Date"
                    >
                      Date
                    </th>
                    <th
                      className="border-fade-blue trn"
                      scope="col"
                      data-trn-key="Amount"
                    >
                      Amount
                    </th>
                    <th
                      className="border-fade-blue trn"
                      scope="col"
                      data-trn-key="Status"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody />
              </table>
              <div className="col-12 text-end" />
            </div>
          </i>
        </div>
        <i className="bi bi-x-circle-fill color-red-dark font-18 me-n4"></i>
      </div>


      {/* Creadit modal End */}
    </>
  )
}

export default RewardsModal
