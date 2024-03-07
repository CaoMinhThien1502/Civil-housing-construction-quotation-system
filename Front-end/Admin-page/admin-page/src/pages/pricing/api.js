import React from "react";
import { useParams } from "react-router-dom";
// Lấy dữ liệu
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const fetchDataComboFromSwagger = async () => {
    try {
          const response = await fetch(`http://localhost:8080/building/form-consultant/list?typeCombo=${id}`, {
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
  // post dữ liệu
  const postDataComboFromSwagger = async (dataPost) => {
    try {
      const response = await fetch(`http://localhost:8080/building/price/list?comboId=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPost),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Data posted successfully:", data);
  
        // Assuming you want to extract the price
        const price = data?.price || 0; // Default to 0 if price is not available
        console.log("Extracted Price:", price); // Add this line for debugging
        return { ...data, price };
      } else {
        console.error("Failed to post data. Server returned:", response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error post data: ", error);
      return null;
    }
  };
  export {postDataComboFromSwagger,fetchDataComboFromSwagger};