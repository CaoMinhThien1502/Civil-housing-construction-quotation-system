import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddMaterial = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [materialTypeId, setMaterialTypeId] = useState("");
    const [materialName, setMaterialName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            materialID: 0,
            materialName: materialName,
            unitPrice: unitPrice,
            status: status
        };

        try {
            const response = await fetch(`http://localhost:8080/combobuilding/material/create?materialTypeId=${1}`, {
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
            navigate('/materiallist');
        } catch (error) {
            console.error('Error during submit:', error);
            // Handle submit errors (e.g., display an error message to the user)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add material</h1>
            <div className="flex flex-col gap-2 w-[400px]">
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login in</button>
            </div>

            <div className="flex flex-col gap-2 w-[400px]">
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
                    <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Material type id"
                    value={materialTypeId}
                    onChange={(e) => setMaterialTypeId(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    />
                </div>

                {/* <div className="form-group">
                    <span id="status-label">Material Type:</span>
                    <select id="status-dropdown" className="form-control">

                    </select>
                    <input 
                    type="hidden" 
                    id="status-field-dropdown" 
                    value=""
                    onChange={(e) => setMaterialTypeId(e.target.value)}/>
                </div>

                <div className="form-group">
                    <span id="status-label">Status:</span>
                    <button id="btn-active" className="btn">Active</button>
                    <button id="btn-inactive" className="btn">Inactive</button>
                    <input 
                    type="hidden" 
                    id="status-field-button" 
                    value=""
                    onChange={(e) => setStatus(e.target.value)}/>
                </div> */}

                <button id="submit" type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
            </div>
        </form>
    );
};
