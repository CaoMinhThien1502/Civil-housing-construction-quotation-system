import React from 'react';
import logo from '../../img/homepage/logoSystem.jpg'
import './bill.css'
import { useEffect, useState } from 'react';
import { FaBlackTie } from 'react-icons/fa';
import { Navigate, redirect } from "react-router-dom";
import MaterialDescription from './description';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
// Deposit -- Please be careful
import { HmacSHA256Hash, IpAddr, URL_API, URL_VNPay, commandPay, currCode, locale, locate, reciveURL, secretKey, tmnCode, txnRef, version } from '../payment/configpayment';
import { HmacSHA256, HmacSHA512 } from 'crypto-js';
import CryptoJS from "crypto-js";
import Thanks from "../payment/success";
//payment
function parseDate() {
    var today = new Date();
    today.setHours(today.getHours() + 7);
    today = today.toISOString();
    today = today.replaceAll('-', '');
    today = today.replaceAll(":", '');
    today = today.replaceAll("T", '');
    let split = today.split(".");
    today = split[0];
    return today;
}

// Hàm bắt khách hàng đăng nhập trước khi báo giá
const LoginModal = ({ show, handleClose }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
                email: email,
                password: password,
            }, { withCredentials: true });

            if (response.status === 200) {
                const token = jwtDecode(response.data.access_Token);
                localStorage.setItem('token', response.data.access_Token);
                localStorage.setItem('tokenTime', token.exp);
                localStorage.setItem('mail', token.sub);
                localStorage.setItem('role', response.data.role);
                handleClose();
                if (response.data.role === "CUSTOMER") {
                    console.log("Hello Customer");
                } else {
                    console.log("Hello Admin");
                }
            } else {
                setError(`Đăng nhập thất bại với mã trạng thái: ${response.status}`);
            }
        } catch (error) {
            console.error("Lỗi trong quá trình đăng nhập:", error);

            if (error.response) {
                setError(error.response.data || "Unknown error");
            } else {
                setError("Đăng nhập thất bại. Vui lòng thử lại.");
            }
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={login}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const InputLockForm = ({ area, typeId, comboName }) => {
    //
    const [combo, setCombo] = useState([]);
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
        axios.get(`http://localhost:8080/combobuilding/combo/getbytype?typeId=${typeId}`, {}, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setCombo(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching Combo Type data:', error));
    }, []); // Thêm typeId vào dependency array của useEffect

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
                            <label htmlFor="comboName">Building Name</label>
                            <input type="text" id="comboName" value={comboName} readOnly />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="comboType">Combo:</label>
                            <select id="comboType" value={selectedComboId} onChange={handleComboTypeChange}>
                                {combo.map((item) => (
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

const Invoice = ({ items, area, comboId }) => {
    const [show, setShow] = useState(true);
    const [object, setObject] = useState([]);
    const [numOBathroom, setNumOBathroom] = useState(0);
    const [numOBedroom, setNumOBedroom] = useState(0);
    const [numOKitchen, setNumOKitchen] = useState(0);
    const [numOFloor, setNumOFloor] = useState(0);
    const [tunnel, setTunnel] = useState(0);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const buildingId = urlParams.get("buildingId");
    const url_Area = urlParams.get("area");
    const typeId = urlParams.get("comboTypeId");
    const comboName = urlParams.get("title");
    // handle Deposit
    const [buildingDetailId, setBuildingDetailId] = useState(0);

    // handle send Quotation 
    const [loginModalShow, setLoginModalShow] = useState(false);

    const handleSendQuotation = async () => {
        if (localStorage.getItem('token') == null) {
            setLoginModalShow(true);
        } else {
            alert("Gửi báo giá thành công! Check email");
            try {
                const requestBody = {
                    "buildingId": object.buildingId,
                    "buildingName": object.buildingName,
                    "percentPrice": object.percentPrice,
                    "area": object.area,
                    "numOBathroom": object.numOBathroom,
                    "numOBedroom": object.numOBedroom,
                    "numOKitchen": object.numOKitchen,
                    "numOFloor": object.numOFloor,
                    "hasTunnel": object.hasTunnel,
                    "comboId": object.comboId,
                    "matesInCustom": object.matesInCustom,
                    "comboPrice": object.comboPrice,
                    "totalPrice": object.totalPrice
                }
                const response = await axios.post(`http://localhost:8080/request-contract/sendQuote?email=${localStorage.getItem("mail")}`, requestBody).then(res => console.log(res));
            } catch (error) {
                console.error("Lỗi trong quá trình gửi giá:", error);
            }
        }
    };
    const handleDeposit = async () => {
        // Component Thanks

        if (localStorage.getItem('token') == null) {
            setLoginModalShow(true);
        }
        else {
            // Get contractId
            try {
                const requestBody = {
                    "buildingDetailId": 0,
                    "area": object.area,
                    "numOKitchen": object.numOKitchen,
                    "numOBathroom": object.numOBathroom,
                    "numOBedroom": object.numOBedroom,
                    "numOFloor": object.numOFloor,
                    "hasTunnel": object.hasTunnel,
                    "status": 0
                }
                const response = await axios.post(`http://localhost:8080/building/detail/create?buildingId=${buildingId}`, requestBody)
                    .then(res => { 
                        //setContractId(res.data.requestContractId);
                        setBuildingDetailId(res.data.detail.buildingDetailId);
                        console.log(res.data.requestContractId + '+' + comboId + '+' + res.data.detail.buildingDetailId);
                        // Now that contractId and buildingDetailId are set, create the VNPay URL
                        let amount = 'vnp_Amount=' + '20000000';
                        let command = '&vnp_Command=' + commandPay;
                        let createDate = '&vnp_CreateDate=' + parseDate();
                        let curCode = '&vnp_CurrCode=' + currCode;
                        let ipAdd = '&vnp_IpAddr=' + IpAddr;
                        let local = '&vnp_Locale=' + locale;
                        let orderInfor = '&vnp_OrderInfo=' + res.data.requestContractId + '+' + comboId + '+' + res.data.detail.buildingDetailId;
                        let orderType = '&vnp_OrderType=' + 'BaoGia';
                        let returnUrl = '&vnp_ReturnUrl=' + reciveURL;
                        let tmn = '&vnp_TmnCode=' + tmnCode;
                        let ref = '&vnp_TxnRef=' + txnRef;
                        let vpnVersion = '&vnp_Version=' + version;
                        let plainText = amount + command + createDate + curCode + ipAdd + local + orderInfor + orderType
                            + returnUrl + tmn + ref + vpnVersion;
                        let sercureHash = HmacSHA512(plainText, secretKey).toString();
                        var vnPayURLRequest = URL_VNPay + plainText + "&vnp_SecureHash=" + sercureHash;
            
                        // Redirect to the VNPay URL
                        window.location = vnPayURLRequest;
                    });
            } catch (error) {
                console.error("Lỗi tạo building Detail");
            }
            
        }
    }
    useEffect(() => {
        // Count occurrences of specific items to get missing information
        let bathroomCount = 0;
        let bedroomCount = 0;
        let kitchenCount = 0;
        let floorCount = 0;
        let tunnelCount = 0;

        items.forEach((item) => {
            if (item.name === "Bathroom") {
                bathroomCount += item.quantity;
            } else if (item.name === "Bedroom") {
                bedroomCount += item.quantity;
            } else if (item.name === "Kitchen") {
                kitchenCount += item.quantity;
            } else if (item.name === "Floor") {
                floorCount += item.quantity;
            } else if (item.name === "Tunnel") {
                tunnelCount += item.quantity;
            }
        });

        setNumOBathroom(bathroomCount);
        setNumOBedroom(bedroomCount);
        setNumOKitchen(kitchenCount);
        setNumOFloor(floorCount);
        setTunnel(tunnelCount);
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
            "numOFloor": numOFloor,
            "hasTunnel": tunnel,
            "comboId": comboId,
            "newMateIds": [],
            "area": url_Area
        };
        axios.post(`http://localhost:8080/building/price/detail`, requestBody, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                setObject(response.data);
                console.log("setPrice: ", response.data);
            })
            .catch(error => console.error('Error fetching Price data:', error));
    }, [numOBathroom, numOBedroom, numOKitchen, numOFloor, typeId, url_Area, comboId, tunnel]);


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
                                <th className="text-gray-700 font-bold uppercase py-2">Deatail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 text-gray-700">Area</td>
                                <td className="py-2 text-gray-700"> {url_Area} m2</td>

                            </tr>
                            {items.map((item) =>
                                <tr key={item.id}>
                                    <td className="py-2 text-gray-700">{item.name}</td>
                                    <td className="py-2 text-gray-700">{item.quantity} room</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-end mb-2 mr-10">
                        <div className="text-gray-700 mr-2">Total:</div>
                        <div className="text-gray-700 font-bold text-xl">{Math.round(object.totalPrice)} VND</div>
                    </div>
                    <div className="flex justify-between">
                        <input
                            type="button"
                            className="btn-checkout btn-send-quote"
                            value='Gửi Báo Giá'
                            onClick={() => handleSendQuotation()}
                        />
                        <input
                            type="button"
                            className="btn-checkout btn-deposit"
                            value='Đặt cọc'
                            onClick={() => handleDeposit()}
                        />
                    </div>
                    <div className="border-t-2 border-gray-300 pt-2 mb-2">
                        <div className="text-gray-700 mb-2">1.Giá có thể lệch so với thực tế 5-10%</div>
                        <div className="text-gray-700 mb-2">2.Giá trên chưa bao gồm VAT(GTGT)</div>
                        <div className="text-gray-700 mb-2">3.Bạn cần đặt cọc 200.000đ nếu muốn có 1 cuộc hẹn</div>
                    </div>
                </div>
            </div>
            <LoginModal show={loginModalShow} handleClose={() => setLoginModalShow(false)} />
        </>
    );
};


export default Invoice;
