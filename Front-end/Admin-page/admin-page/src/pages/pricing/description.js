import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import './description.css';

function MaterialDescription({ comboId }) {
    const [allMateList, setAllMateList] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState({ mateId: '', matePrice: 0 });
    const [defaultPrices, setDefaultPrices] = useState({});

    const handleProductChange = (event, mateTypeName) => {
        const selectedMateId = event.target.value;
        const mateType = allMateList.find(type => type.mateTypeName === mateTypeName);
        if (mateType) {
            const selectedMate = mateType.mateList.find(mate => mate.mateId === selectedMateId);
            setSelectedMaterial(selectedMate ? { mateId: selectedMateId, matePrice: selectedMate.mate.matePrice } : { mateId: '', matePrice: 0 });
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/custom-combo/get-form?comboId=${comboId}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    setAllMateList(response.data.infor.mateList);
                    const defaultPricesObj = {};
                    response.data.infor.mateList.forEach(item => {
                        defaultPricesObj[item.mate.mateName] = item.mate.matePrice;
                    });
                    setDefaultPrices(defaultPricesObj);
                    setShowModal(true);
                } else {
                    console.error('Error fetching Combo Type data:', response);
                }
            })
            .catch(error => console.error('Error fetching Combo Type data:', error));
    }, [comboId]);

    const getAlternativeMaterials = (mateTypeName) => {
        let mateNames = [];
        if (Array.isArray(allMateList) && allMateList.length > 0) {
            allMateList.forEach(item => {
                if (item.mateTypeName === mateTypeName) {
                    if (Array.isArray(item.mateList) && item.mateList.length > 0) {
                        item.mateList.forEach(mate => {
                            mateNames.push({ mateId: mate.mate.mateId, mateName: mate.mate.mateName });
                        });
                    }
                }
            });
        }
        return mateNames;
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Sản phẩm xây dựng
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="item-description">
                        <ul className="responsive-table">
                            <li className="table-item-header">
                                <div className="col col-1">Material_Type</div>
                                <div className="col col-2">Material_Name</div>
                                <div className="col col-3">New Material</div>
                                <div className="col col-4">Unit Price</div>
                            </li>
                            {Array.isArray(allMateList) ? (
                                allMateList.map((item, index) => (
                                    <li className="table-item-row" key={index}>
                                        <div className="col col-1" data-label="Material Type">{item.mateTypeName}</div>
                                        <div className="col col-2" data-label="Material Name">{item.mate.mateName}</div>
                                        <div className="col col-3" data-label="New Material">
                                            <select value={selectedMaterial.mateId} onChange={(event) => handleProductChange(event, item.mateTypeName)}>
                                                <option value="">Chọn nếu bạn muốn thay đổi</option>
                                                {getAlternativeMaterials(item.mateTypeName).map((altItem, altIndex) => (
                                                    <option value={altItem.mateId} key={altIndex}>{altItem.mateName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col col-4" data-label="Unit Price">{defaultPrices[item.mate.mateName]}</div>
                                    </li>
                                ))
                            ) : (
                                <li>Loading...</li>
                            )}
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default MaterialDescription;
