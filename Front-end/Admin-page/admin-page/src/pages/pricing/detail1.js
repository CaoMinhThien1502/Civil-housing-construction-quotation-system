import React, { useState } from "react";
import './detail1.css'
import Invoice from "./bill";
import bedroom from '../../img/bedroom.jpg'
import kitchen from '../../img/kitchen.jpg'
import bathroom from '../../img/bathroom.jpg'
import toilet from '../../img/toilet.jpg'
import Button from 'react-bootstrap/Button';
import ItemDescription from "./description";
function ListItem() {
  const [items, setItems] = useState([
    {
      id: 0,
      image: bedroom,
      name: "Phòng ngủ",
      description: "",
      quantity: 1
    },
    {
      id: 1,
      image: kitchen,
      name: "Phòng bếp",
      description: "",
      quantity: 1
    },
    {
      id: 2,
      image: bathroom,
      name: "Phòng tắm",
      description: "", 
      quantity: 1
    },
    {
      id: 3,
      image: toilet,
      name: "Nhà vệ sinh",
      description: "",
      quantity: 1
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDetail = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }
  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const image = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const newItem = {
      id: items.length,
      image: image,
      name: name,
      description: description
    };
    setItems([...items, newItem]);
  };
  const handleQuantityChange = (id,newQuantity) => {
    setItems(items.map(item => 
      item.id === id? {...item,quantity: newQuantity} : item));
  } 
  return (
    <>
      <div className="container-item">
        {/* <h1> List Items </h1> */}
        <div id="table-container-item">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th>name</th>
                <th>quantity</th>
                <th>description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <a>
                      <img style = {{width: "120px", height: "110px", objectFit: "cover"}}src={item.image} alt={item.name} />
                    </a>
                  </td>
                  <td>{item.name}</td>
                  <td><input
                  type="number"
                  value={item.quantity}
                  onChange={(e)=>handleQuantityChange(item.id,parseInt(e.target.value))}
                  style={{width: "80px",textAlign: "center"}}
                  />
                  </td>
                  <td><Button variant="outline-primary" size='sm' onClick={() => handleDetail(item)}>Detail</Button></td>
                  <td>
                    <Button 
                    variant="outline-danger"
                    size = "sm"
                    onClick={() => handleRemove(item.id)}
                    >Remove</Button>
                  </td>
                  <br/>
                </tr>
                   
              ))}
            </tbody>
            <tbody>
              <tr>
                <td colSpan="4"></td>
                <td>
                  <a className="Add-item" onClick={handleAdd} id="Add">
                    Add
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="popup-item">
        <div className="popup-content-item">
          <div className="popup-header-item">
            <span className="close-item">&times;</span>
          </div>
          <div className="input-group-item">
            <label htmlFor="image">Link Image</label>
            <input type="text" id="image" name="image" />
          </div>
          <div className="input-group-item">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="input-group-item">
            <label htmlFor="description">description</label>
            <input type="text" id="description" name="description" />
          </div>
          <div className="btn-group-item">
            <a id="addTotable">Add To Table</a>
          </div>
        </div>
      </div>
      <Invoice items={items} />
      {showModal && <ItemDescription item={selectedItem} setShowModal={setShowModal} />}
    </>
  );
}

export default ListItem;
