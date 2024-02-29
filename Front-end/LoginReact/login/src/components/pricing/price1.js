import React, { useState } from "react";
import { Header } from "../login/home/home";
import image1 from "../../../src/img/img/BaoGiaPTtietkiem-01.jpg";

const ConstructionForm = () => {
  const [landArea, setLandArea] = useState("");
  const [constructionPackage, setConstructionPackage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request here
      const response = await fetch("your_api_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landArea,
          constructionPackage,
        }),
      });

      const data = await response.json();

      // Handle the API response as needed
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Diện tích đất */}
          <div className="col-md-4 mb-3">
            <label htmlFor="landArea" className="form-label">
              Diện tích đất
            </label>
            <input
              type="text"
              className="form-control"
              id="landArea"
              name="landArea"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              required
            />
          </div>

          {/* Gói xây dựng */}
          <div className="col-md-4 mb-3">
            <label htmlFor="constructionPackage" className="form-label">
              Gói xây dựng
            </label>
            <select
              className="form-select"
              id="constructionPackage"
              name="constructionPackage"
              value={constructionPackage}
              onChange={(e) => setConstructionPackage(e.target.value)}
              required
            >
              <option value="">Chọn gói xây dựng</option>
              <option value="tietkiem">Gói Tiết Kiệm</option>
              <option value="caocap">Gói Cao Cấp</option>
            </select>
          </div>

          {/* Nút Submit */}
          <div className="col-md-4 mb-3">
            <button type="submit" className="btn btn-primary">
              Gửi Yêu Cầu
            </button>
          </div>
        </form>
        <ConsultImg />
      </div>
    </>
  );
};

const ConsultImg = () => {
  return (
    <div>
      <img src={image1} alt="Consultation Image" style={{ width: '85%', height: 'auto' }} />
    </div>
  );
};

export { ConstructionForm, ConsultImg };
