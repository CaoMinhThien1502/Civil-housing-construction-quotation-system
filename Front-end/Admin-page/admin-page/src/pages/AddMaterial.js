import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddMaterial = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const fetchMaterials = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include', // Include credentials for cross-origin requests
                });
    
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
    
                // console.log('Login successful:', response.json());
    
                // Handle successful login (e.g., navigate to a different page, store user data)
                navigate('/materiallist');
                console.log('Login successful');
            } catch (error) {
                console.error('Error during login:', error);
    
                // Handle login errors (e.g., display an error message to the user)
            }
        };

        fetchMaterials();
    }, []); // Empty dependency array to fetch data only once on component mount

    

    return (
        <form onSubmit={fetchMaterials}>
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
                    <input type="text" className="form-control" placeholder="Material Name"/>
                </div>
                <div className="form-group">
                    <input type="number" className="form-control" placeholder="Unit Price"/>
                </div>
                <div className="form-group">
                    <span id="status-label">Material Type:</span>
                    <select id="status-dropdown" className="form-control">

                    </select>
                    <input type="hidden" id="status-field-dropdown" value=""/>
                </div>
                <div className="form-group">
                    <span id="status-label">Status:</span>
                    <button id="btn-active" className="btn">Active</button>
                    <button id="btn-inactive" className="btn">Inactive</button>
                    <input type="hidden" id="status-field-button" value=""/>
                </div>
                <button id="submit" type="submit" className="btn btn-primary waves-effect waves-light">Submit</button>
            </div>
        </form>
    );
};
