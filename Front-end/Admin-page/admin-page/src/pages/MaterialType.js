import React, { useState, useEffect } from 'react';

export const MaterialType = () => {
    const [materialTypes, setMaterialTypes] = useState([]);

    useEffect(() => {
        const fetchMaterialTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/material-type/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterialTypes(data);
            } catch (error) {
                console.error('Error fetching material types:', error);
            }
        };

        fetchMaterialTypes();
    }, []); // Empty dependency array to fetch data only once on component mount
    
    return (
        <>
            <h2>Material Type</h2>
            <div className="asset-inner">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name of Material Type</th>
                            <th>Setting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materialTypes.map((materialType) => (
                            <tr key={materialType.materialTypeId}>
                                <td>{materialType.materialTypeId}</td>
                                <td>{materialType.typeName}</td>
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
    )
}