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
import MaterialDescription from './description';

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
      quantity: 0,
      tunnelStatus: false
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedComboId, setSelectedComboId] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const typeId = urlParams.get("comboTypeId");

  useEffect(() => {
    axios.get(`http://localhost:8080/combobuilding/combo/getbytype?typeId=${typeId}`, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
      .then(response => {
        setCombo(response.data);
      })
      .catch(error => console.error('Error fetching Combo Type data:', error));
  }, []);

  const handleComboTypeChange = (event) => {
    setSelectedComboId(event.target.value);
    console.log("selectedComboId: ",event.target.value);
    
  };

  const handleMaterialDescription = () => {
    setIsClick(true);
  }

  const handleDetail = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  }

  const handleNo = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, tunnelStatus: false, quantity: 0 } : item));
  }
  
  const handleYes = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, tunnelStatus: true, quantity: 1 } : item));
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
        <div id="table-container-item">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Detail</th>
                <th>Unity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <a>
                      <img src={item.image} alt={item.name} />
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
                      <>
                        <Button variant="outline-primary" size='sm' onClick={() => handleYes(item.id)} className={item.tunnelStatus ? "yesButton active" : "yesButton"}>
                          Yes
                        </Button>
                        <Button variant="outline-danger" size='sm' onClick={() => handleNo(item.id)} className={!item.tunnelStatus ? "noButton active" : "noButton"}>
                          No
                        </Button>
                      </>
                    )}
                    {item.name === "Combo" && (
                      <select id="comboType" onChange={handleComboTypeChange}>
                      <option value="">Chọn combo</option>
                      {combo.map((item) => (
                        <option key={item.comboBuildingId} value={item.comboBuildingId}>
                          {item.comboBuildingName}
                        </option>
                      ))}
                    </select>
                    )}
                  </td>
                  <td>
                    {item.name !== "Combo"  && (
                      <div>room</div>
                    )}
                    {item.name === "Combo" && (
                      <Button variant="outline-primary" size='sm' onClick={() => handleMaterialDescription}>
                      Detail
                    </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Invoice items={items} comboId={selectedComboId}/>
      {(selectedComboId !== 0)&& <MaterialDescription comboId={selectedComboId} />}
    </>
  );
}

export default ListItem;
