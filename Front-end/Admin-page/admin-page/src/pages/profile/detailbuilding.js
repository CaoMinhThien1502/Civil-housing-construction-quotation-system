import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function ContractDetail() {
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card border-top border-bottom border-3" style={{ borderColor: "#f37a27 !important" }}>
              <div className="card-body p-5">

                <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>Contract Detail</p>

                <div className="row">
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">Date</p>
                    <p>10 April 2024</p>
                  </div>
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">Order No.</p>
                    <p>abcdxyz1</p>
                  </div>
                </div>

                <div className="mx-n5 px-5 py-4" style={{ backgroundColor: "#f2f2f2" }}>
                  <div className="row">
                    <div className="col-md-8 col-lg-9">
                      <p>SubTotal</p>
                    </div>
                    <div className="col-md-4 col-lg-3">
                      <p>300.000.000</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-lg-9">
                      <p className="mb-0">Deposit</p>
                    </div>
                    <div className="col-md-4 col-lg-3">
                      <p className="mb-0">200.000</p>
                    </div>
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col-md-4 offset-md-8 col-lg-6 offset-lg-9">
                    <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>299.800.000</p>
                  </div>
                </div>

                <p className="lead fw-bold mb-1 pb-1" style={{ color: "#f37a27" }}>Address and Time meeting</p>
                <p className="mt-1 pt-1 mb-0">Status : <a href="#!" style={{ color: "#f37a27" }}>Processing</a></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContractDetail;
