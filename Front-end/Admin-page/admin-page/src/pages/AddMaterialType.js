import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddMaterialType = () => {
    const navigate = useNavigate();

    const [typeName, setTypeName] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            // materialTypeId: 0,
            typeName: typeName,
            status: 1
        };

        try {
            const response = await fetch('http://localhost:8080/combobuilding/material-type/create', {
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
            navigate('/material-type-list');
        } catch (error) {
            console.error('Error during submit:', error);
            // Handle submit errors (e.g., display an error message to the user)
        }
    };

    return (
        <>
            <h2>Add Material Type</h2>
            <div className="asset-inner">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="typeName">Type Name</label>
                        <input
                            type="text"
                            id="typeName"
                            value={typeName}
                            onChange={(event) => setTypeName(event.target.value)}
                        />
                    </div>
                    <button id="cancel" type="button" className="btn btn-primary waves-effect waves-light" onClick={() => navigate('/material-type-list')}>Cancel</button>
                    <button type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
                </form>
            </div>
        </>
    )
};