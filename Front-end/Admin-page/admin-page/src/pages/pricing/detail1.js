import { useEffect, useState } from 'react';
import axios from "axios";
import './detail1.css'
import Invoice from "./bill";
import bedroom from '../../img/bedroom.jpg'
import kitchen from '../../img/kitchen.jpg'
import bathroom from '../../img/bathroom.jpg'
import toilet from '../../img/toilet.jpg'
import basement from '../../img/basement.jpg'
import Button from 'react-bootstrap/Button';
import ItemDescription from "./description";
function ListItem() {
  const [combo, setCombo] = useState([]);
  const [items, setItems] = useState([
    {
      id: 0,
      image: bedroom,
      name: "Combo",
      action: "",
      quantity: 1
    },
    {
      id: 1,
      image: bedroom,
      name: "Bedroom",
      action: "",
      quantity: 1
    },
    {
      id: 2,
      image: kitchen,
      name: "Kitchen",
      action: "",
      quantity: 1
    },
    {
      id: 3,
      image: bathroom,
      name: "Bathroom",
      action: "",
      quantity: 1
    },
    {
      id: 4,
      image: basement,
      name: "Floor",
      action: "",
      quantity: 1
    },
    {
      id: 5,
      image: basement,
      name: "Tunnel",
      action: "",
      quantity: 0
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedComboId, setSelectedComboId] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const typeId = urlParams.get("comboTypeId");
  useEffect(() => {
    axios.get(`http://localhost:8080/combobuilding/combo/getbytype?typeId=${typeId}`, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
      .then(response => {
        setCombo(response.data);
        console.log("hi" + response.data);
      })
      .catch(error => console.error('Error fetching Combo Type data:', error));
  }, []);
  const handleComboTypeChange = (event) => {
    setSelectedComboId(event.target.value);
  };
  const handleDetail = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }
  const handleNo = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }
  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleQuantityChange = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item));
  };
  const handleChangeStatus = (id) => {
    setItems(items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity === 0 ? 1 : 0 };
      }
      return item;
    }));
  };


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
                <th>detail</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <a>
                      <img style={{ width: "120px", height: "110px", objectFit: "cover" }} src={item.image} alt={item.name} />
                    </a>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {item.name !== "Tunnel" && item.name !== "Combo"  && (
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}          
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        style={{ width: "80px", textAlign: "center" }}
                      />
                    )}
                    {item.name === "Tunnel" && (
                      <div>
                        {item.quantity === 1 ? 'Yes' : 'No'}
                      </div>
                    )}
                    {item.name === "Combo" && (
                      <select id="comboType" value={selectedComboId} onChange={handleComboTypeChange}>
                      {combo.map((item) => (
                        <option key={item.comboBuildingId} value={item.comboBuildingId}>
                          {item.comboBuildingName}
                        </option>
                      ))}
                    </select>
                    )}
                  </td>
                  <td>
                    {item.name === "Tunnel" && (
                      <Button variant="outline-primary" size='sm' onClick={() => handleChangeStatus(item.id)}>
                        Yes
                      </Button>
                    )}
                    {item.name !== "Tunnel" && item.name !== "Combo"  && (
                      <div>room</div>
                    )}
                  </td>
                  <br />
                </tr>
              ))}

            </tbody>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
      <Invoice items={items} />
      {showModal && <ItemDescription item={selectedItem} setShowModal={setShowModal} />}
    </>
  );
}

export default ListItem;
