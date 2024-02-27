import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddMaterial = () => {
    const navigate = useNavigate();

    const [materialTypeId, setMaterialTypeId] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [materialTypes, setMaterialTypes] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            materialID: 0,
            materialName: materialName,
            unitPrice: unitPrice,
            status: 1
        };

        try {
            const response = await fetch(`http://localhost:8080/combobuilding/material/create?materialTypeId=${materialTypeId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include', // Include credentials for cross-origin requests
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            } else {
                console.log('Add successful:', data);
            }

            // Handle successful (e.g., navigate to a different page, store user data)
            navigate('/material-list');
        } catch (error) {
            console.error('Error during submit:', error);
            // Handle submit errors (e.g., display an error message to the user)
        }
    };

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

    const handleMaterialTypeChange = (event) => {
        setMaterialTypeId(event.target.value);
        console.log('Material Type ID:', event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add material</h1>
            <div className="flex flex-col gap-2 w-[400px]">
                <div className="form-group">
                    <span id="status-label">Material Type:</span>
                    <select 
                    id="status-dropdown" 
                    className="form-control"
                    onChange={handleMaterialTypeChange}>
                        {materialTypes.map((materialType) => (
                            <option key={materialType.materialTypeId} value={materialType.materialTypeId}>
                                {materialType.typeName}
                            </option>
                        ))}
                    </select>
                    <input 
                    type="hidden" 
                    id="status-field-dropdown" 
                    value=""
                    onChange={(e) => setMaterialTypeId(e.target.value)}/>
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Material Name"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Unit Price"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <span id="status-label">Status: Active</span>
                </div>
                
                <button id="cancel" type="button" className="btn btn-primary waves-effect waves-light" onClick={() => navigate('/material-list')}>Cancel</button>
                <button id="submit" type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
            </div>
        </form>
    );
};
