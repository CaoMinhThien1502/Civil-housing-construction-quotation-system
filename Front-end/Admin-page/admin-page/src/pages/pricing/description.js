import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import './description.css';

function MaterialDescription({comboId,}) {
    const [allMaterialList, setAllMaterialList] = useState([]);
    const [allMaterialList1, setAllMaterialList1] = useState([]);
    const [showModal,setShowModal] = useState(false);   
    const [selectedMaterial, setSelectedMaterial] = useState({ mateId: '', matePrice: 0 });
    const [defaultPrices, setDefaultPrices] = useState({});
    const [mateNames,setMateNames] = useState([])
    const handleProductChange = (event, mateTypeName) => {
        const selectedMateId = event.target.value;
        const mateType = allMaterialList?.find(type => type.mateTypeName === mateTypeName);
        if (mateType) {
            const selectedMate = mateType.mateList?.find(mate => mate.mateId === selectedMateId);
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
                    setAllMaterialList(response.data.infor.mateList);
                    setAllMaterialList1(response.data.allMateList);
                   
                    const defaultPricesObj = {};
                    // response.data.infor.mateList.forEach(item => {
                    //     defaultPricesObj[item.mate.mateName] = item.mate.matePrice;
                    // });
                    setDefaultPrices(defaultPricesObj);
                    setShowModal(true);
                } else {
                    console.error('Error fetching Combo Type data:', response);
                }
            })
            .catch(error => console.error('Error fetching Combo Type data:', error));
    }, [comboId]);

    console.log("allMaterialist: ",allMaterialList);
    console.log(allMaterialList1);
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
                            {allMaterialList && allMaterialList.map((item, index) => (
    <li className="table-item-row" key={index}>
        <div className="col col-1" data-label="Material Type">{item.mateTypeId}</div>
        <div className="col col-2" data-label="Material Name">{item.mate.mateName}</div>
        <div className="col col-3" data-label="New Material">
    <select>
        <option value="">Select new material</option>
        {allMaterialList1?.map((itemMate, altIndex) => {
            if (itemMate.mateTypeId === item.mateTypeId) {
                return itemMate.mates?.map((itemMatess, optionIndex) => (
                    <option value={itemMatess.mateId} key={optionIndex}>{itemMatess.mateName}</option>
                ));
            }   
            return null; 
        })}
    </select>
</div>

        <div className="col col-4" data-label="Unit Price">{item.mate.matePrice}</div>
    </li>
))}
                         
                        </ul>
                        <input type='button' value="Submit"/>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default MaterialDescription;
