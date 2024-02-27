import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const MaterialList = () => {
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/material/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterials(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, []); // Empty dependency array to fetch data only once on component mount

    return (
        <>
            <h2>Material List</h2>
            <div>
                <Link to="/add-material">Add Material</Link>
            </div>
            <div className="asset-inner">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name of Material</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material) => (
                            <tr key={material.materialId}>
                                <td>{material.materialId}</td>
                                <td>{material.materialName}</td>
                                <td>
                                    <button
                                        className={`${material.status ? 'pd' : 'ds'}-setting`}
                                    >
                                        {material.status ? 'Active' : 'Disabled'}
                                    </button>
                                </td>
                                <td>{material.unitPrice.toLocaleString('vi-VN')}</td>
                                <td>
                                    <button className="edit-setting">Edit</button>
                                    <button className="delete-setting">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}