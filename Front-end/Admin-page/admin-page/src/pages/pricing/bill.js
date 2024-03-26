import React from 'react';
import logo from '../../img/homepage/logoSystem.jpg'
import './bill.css'
import { useEffect, useState } from 'react';
import { FaBlackTie } from 'react-icons/fa';
import { redirect } from "react-router-dom";
import MaterialDescription from './description';
import axios from "axios";


const InputLockForm = ({ area, typeId, comboName }) => {
    const [comboType, setComboType] = useState([]);
    const [selectedComboId, setSelectedComboId] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(true); // Thêm state để kiểm soát trạng thái của form

    // Function to handle combo type selection
    const handleComboTypeChange = (event) => {
        setSelectedComboId(event.target.value);
    };

    // Function to handle saving and closing the form
    const handleSaveAndClose = () => {
        setIsFormOpen(false); // Đóng form khi bấm nút "Save"
    };

    useEffect(() => {
        axios.post(`http://localhost:8080/combobuilding/combo/getbytype?typeId=${typeId}`, {}, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    setComboType(response.data);
                    console.log(response.data);
                } else {
                    console.error('Error fetching Combo Type data:', response);
                }
            })
            .catch(error => console.error('Error fetching Combo Type data:', error));
    }, [typeId]); // Thêm typeId vào dependency array của useEffect

    // Nếu form đã đóng, không hiển thị nữa
    if (!isFormOpen) {
        return null;
    }

    return (
        <div className="input-lock-form">
            <table>
                <thead>
                    <tr>
                        <th>Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="area">Area</label>
                            <input type="text" id="area" value={area} readOnly />
                            <span>m2</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="comboName">ComboName</label>
                            <input type="text" id="comboName" value={comboName} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="comboType">ComboType:</label>
                            <select id="comboType" value={selectedComboId} onChange={handleComboTypeChange}>
                                {comboType.map((item) => (
                                    <option key={item.comboBuildingId} value={item.comboBuildingId}>
                                        {item.comboBuildingName}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSaveAndClose}>Save</button> {/* Thêm nút "Save" */}
            {selectedComboId && <MaterialDescription comboId={selectedComboId} />}
        </div>
    );
}

const Invoice = ({ items, area }) => {
    const [show, setShow] = useState(true);
    const [price,setPrice] = useState([]);
    const [numOBathroom, setNumOBathroom] = useState(0);
    const [numOBedroom, setNumOBedroom] = useState(0);
    const [numOKitchen, setNumOKitchen] = useState(0);
    const [numOFloor, setNumOFloor] = useState(0);

    const urlParams = new URLSearchParams(window.location.search);
    const buildingId = urlParams.get("buildingId");
    const url_Area = urlParams.get("area");
    const typeId = urlParams.get("comboTypeId");
    const comboName = urlParams.get("title");

    useEffect(() => {
        // Count occurrences of specific items to get missing information
        let bathroomCount = 0;
        let bedroomCount = 0;
        let kitchenCount = 0;
        let floorCount = 0;

        items.forEach((item) => {
            if (item.name === "Phòng tắm") {
                bathroomCount += item.quantity;
            } else if (item.name === "Phòng ngủ") {
                bedroomCount += item.quantity;
            } else if (item.name === "Phòng bếp") {
                kitchenCount += item.quantity;
            } else if (item.name === "Tầng") {
                floorCount += item.quantity;
            }
        });

        setNumOBathroom(bathroomCount);
        setNumOBedroom(bedroomCount);
        setNumOKitchen(kitchenCount);
        setNumOFloor(floorCount);
    }, [items]);

    const handleClickLock = () => {
        setShow(false);
    }

    useEffect(() => {
        const requestBody = {
            "buildingId": buildingId,
            "numOBathroom": numOBathroom,
            "numOBedroom": numOBedroom,
            "numOKitchen": numOKitchen,
            "NumOFloor": numOFloor,
            "hasTunnel": true,
            "comboId": typeId,
            "newMateIds": [],
            "area": url_Area
        };
        axios.post(`http://localhost:8080/building/price/detail`, requestBody)
            .then(response => {
                if (response.status === 200) {
                    setPrice(response.data);
                } else {
                    console.error('Error fetching Price data:', response);
                }
            })
            .catch(error => console.error('Error fetching Price data:', error));
    }, [numOBathroom, numOBedroom, numOKitchen, numOFloor, typeId, url_Area]);
    

    return (
        <>
            {show && (
                <div className="lock-icon" onClick={handleClickLock}>
                    Unlock
                </div>
            )}
            {!show && <InputLockForm area={url_Area} typeId={typeId} comboName={comboName} />}
            <div className='invoice-container'>
                <div className="bg-white rounded-lg shadow-lg px-1 py-1 mt-4 max-w-md mx-auto my-custom-form-size">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <img className="h-12 w-12 mr-2" src={logo} alt="Logo" />
                            <div className="text-gray-700 font-semibold text-lg">CHCQS</div>
                        </div>
                        <div className="text-gray-700 mt-2">
                            <div className="font-bold text-xl mb-2">INVOICE</div>
                            <div className="text-sm">Date: 01/05/2023</div>
                            <div className="text-sm">Invoice #: INV12345</div>
                        </div>
                    </div>
                    <table className="w-full text-left mb-2">
                        <thead>
                            <tr>
                                <th className="text-gray-700 font-bold uppercase py-2">Name</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                                {/* <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Total</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <div className="flex items-start h-4 w-26 ">Area : {url_Area}m2</div>
                            {items.map((item) =>
                                <tr key={item.id}>
                                    <td className="py-2 text-gray-700">{item.name}</td>
                                    <td className="py-2 text-gray-700">{item.quantity}</td>
                                    {/* <td className="py-2 text-gray-700">$100.00</td>
                                    <td className="py-2 text-gray-700">$100.00</td> */}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-end mb-2 mr-10">
                        <div className="text-gray-700 mr-2">Total:</div>
                        <div className="text-gray-700 font-bold text-xl">{price.totalPrice}</div>
                    </div>
                    <div className="flex justify-between">
                        <input
                            type="button"
                            className="btn-checkout btn-send-quote"
                            value='Gửi Báo Giá'
                        />
                        <input
                            type="button"
                            className="btn-checkout btn-deposit"
                            value='Đặt cọc'
                        />
                    </div>
                    <div className="border-t-2 border-gray-300 pt-2 mb-2">
                        <div className="text-gray-700 mb-2">1.Giá có thể lệch so với thực tế 5-10%</div>
                        <div className="text-gray-700 mb-2">2.Giá trên chưa bao gồm VAT(GTGT)</div>
                        <div className="text-gray-700 mb-2">3.Bạn cần đặt cọc 200.000đ nếu muốn có 1 cuộc hẹn</div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Invoice;
