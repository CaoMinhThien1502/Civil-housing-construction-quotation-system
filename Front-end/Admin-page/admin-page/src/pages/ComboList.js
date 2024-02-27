import React, { useState, useEffect } from 'react';
// import './ComboList.css'; // Import your CSS file for styling (optional)

export const ComboList = () => {
    const [comboBuildings, setComboBuildings] = useState([]);

    useEffect(() => {
        const fetchComboBuildings = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/combo-building/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setComboBuildings(data);
            } catch (error) {
                console.error('Error fetching combo buildings:', error);
            }
        };

        fetchComboBuildings();
    }, []); // Empty dependency array to fetch data only once on component mount

    return (
        <>
            <h2>Combo List</h2>
            <div className="asset-inner">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name of Combo</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comboBuildings.map((comboBuilding) => (
                            <tr key={comboBuilding.comboBuildingId}>
                                <td>{comboBuilding.comboBuildingId}</td>
                                {
                                    // Optional image handling (replace placeholder with your logic)
                                    /*<td>
                                      <img
                                        src={`img/product/book-${comboBuilding.type + 1}.jpg`}
                                        alt={`Combo ${comboBuilding.comboBuildingName}`}
                                      />
                                    </td>*/
                                }
                                <td>{comboBuilding.comboBuildingName}</td>
                                <td>
                                    <button
                                        className={`${comboBuilding.status ? 'pd' : 'ds'}-setting`}
                                    >
                                        {comboBuilding.status ? 'Active' : 'Disabled'}
                                    </button>
                                </td>
                                <td>
                                    {comboBuilding.type === 0
                                        ? 'Thô'
                                        : comboBuilding.type === 1
                                            ? 'Hoàn thiện'
                                            : 'Trọn gói'}
                                </td>
                                <td>${comboBuilding.unitPrice.toLocaleString('vi-VN')}</td>
                                <td>
                                    <a
                                        href={`${comboBuilding.comboBuildingName.replace(/ /g, "-")}.html`}
                                        title="Combo Detail"
                                    >
                                        <button className="pd-setting-ed">
                                            <i className="fa fa-book" aria-hidden="true"></i>
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}