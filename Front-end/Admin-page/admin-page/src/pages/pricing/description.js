import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import './description.css';
function ItemDescription({ item, setShowModal }) {
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };
    return (
        <>
            <Modal
                show={true}
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
                    <div class="item-description">
                        {/* <h2><small>Lấy chuẩn 50m2</small></h2> */}
                        <ul class="responsive-table">
                            <li class="table-item-header">
                                <div class="col col-1">No</div>
                                <div class="col col-2">Material_Name</div>
                                <div class="col col-3">New Material</div>
                                <div class="col col-4">Unit Price</div>
                            </li>
                            <li class="table-item-row">
                                <div class="col col-1" data-label="No">00001</div>
                                <div class="col col-2" data-label="Material Name">Xi măng loại 1</div>
                                <div class="col col-3" data-label="New Material">
                                <select value={selectedProduct} onChange={handleProductChange}>
                                        <option value="">Chọn nếu bạn muốn thay đổi</option>
                                        <option value="Xi măng loại 1">Xi măng Hà Tiên</option>
                                        <option value="Xi măng loại 2">Xi măng Tân Phú</option>
                                        <option value="Xi măng loại 3">Xi măng 205</option>
                                </select>
                                </div>
                                <div class="col col-4" data-label="Unit Price">2 triệu</div>
                            </li>
                            <li class="table-item-row">
                                <div class="col col-1" data-label="No">00002</div>
                                <div class="col col-2" data-label="Material Name">Xi măng loại 2</div>
                                <div class="col col-3" data-label="New Material">
                                <select value={selectedProduct} onChange={handleProductChange}>
                                        <option value="">Chọn nếu bạn muốn thay đổi</option>
                                        <option value="Xi măng loại 4">Xi măng Hà Tiên</option>
                                        <option value="Xi măng loại 5">Xi măng Tân Phú</option>
                                        <option value="Xi măng loại 6">Xi măng 205</option>
                                </select>
                                </div>
                                <div class="col col-4" data-label="Unit Price">2 triệu</div>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ItemDescription;