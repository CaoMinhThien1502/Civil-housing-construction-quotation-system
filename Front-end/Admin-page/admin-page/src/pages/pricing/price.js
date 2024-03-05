import React, { useState, useEffect } from "react";
import { Header } from "../home/home";
import image1 from "../../img/BaoGiaPTtietkiem-01.jpg"
import Form from 'react-bootstrap/Form';

const ConstructionForm = () => {
  const [landArea, setLandArea] = useState("");
  const [constructionPackage, setConstructionPackage] = useState("");
  const [swaggerData, setSwaggerData] = useState(null);

  const fetchDataFromSwagger = async () => {
    try {
      const response = await fetch("http://localhost:8080/building/form-consultant/list?typeCombo=0", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from Swagger:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchDataFromSwagger();
      setSwaggerData(data);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromSwagger();
        setSwaggerData(data);
      } catch (error) {
        // Handle error if needed
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <div className="container mt-5">
        {swaggerData && (
          <form onSubmit={handleSubmit} className="row g-2">
            <div className="col-md-12 mb-1">
              <label htmlFor="constructionPackage" className="form-label">
                Combo
              </label>
              <Form.Select>
                {swaggerData.comboList.map((combo) => (
                  <option key={combo.comboBuildingId}>{combo.comboBuildingName}</option>
                ))}
              </Form.Select>
            </div>
            {/* Sử dụng itemTypeList cho Loại Nhà, Hầm, Tầng, Mái */}
            {["Loại Nhà", "Hầm", "Tầng", "Mái"].map((typeName) => (
              <div key={typeName} className="col-md-6 mb-1">
                <label htmlFor="constructionPackage" className="form-label">
                  {typeName}
                </label>
                <Form.Select>
                  {swaggerData.itemTypeList
                    .find((itemType) => itemType.itemTypeName === typeName)
                    .itemList.map((item) => (
                      <option key={item.itemId}>{item.itemName}</option>
                    ))}
                </Form.Select>
              </div>
            ))}
            {/* Nút Submit */}
            <div className="col-md-4 mb-3">
              <button type="submit" className="btn btn-primary">
                Gửi Yêu Cầu
              </button>
            </div>
          </form>
        )}
        <ConsultImg />
      </div>
    </>
  );
};


const ConsultImg = () => {
  return (
    <div>
      <img src={image1} alt="Consultation Image" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export { ConstructionForm, ConsultImg };
