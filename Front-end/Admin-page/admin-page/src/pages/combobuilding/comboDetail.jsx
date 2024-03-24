import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Footer } from '../home/home.js';
import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const ComboDetail = () => {
    const { id } = useParams();
    const [getCombo, setCombo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/combobuilding/combo/getbytype?typeId=${id}`)
            .then(response => {
                setCombo(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
            });
    }, [id]);

    const constructionOptions = {
        0: "Rough Construction",
        1: "Construction and finishing",
        2: "Package construction",
    };
    const displayOption = constructionOptions[id] ?? "Invalid id";

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 1;
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const paginatedData = getCombo.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Container div for styling */}
            <Header />
            <Typography variant="h5" style={{ textAlign: 'center', marginTop: '100px' }}>Combo Building</Typography>
            <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '10px' }}>{displayOption}</Typography>
            <div style={{ flex: 1, paddingLeft: '100px', paddingRight: '100px' }}> {/* Add paddingLeft and paddingRight */}
                {/* Check if getCombo has data before rendering */}
                {getCombo && (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ border: '1px solid #ddd', width: '160px' }}>Combo Building Name</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', width: '400px' }}>Material Type</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', width: '400px' }}>Material Name</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', width: '100px' }}>Unit Price</TableCell>
                                    <TableCell style={{ border: '1px solid #ddd', width: '100px' }}>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                            {paginatedData.map((combo, index) => (
                                <TableBody>
                                    {/* add merged column for combo building name */}
                                    <TableRow>
                                        <TableCell rowSpan={combo.materialTypeOfComboDto.length + 1} style={{ border: '1px solid #ddd' }}>{combo.comboBuildingName}</TableCell>
                                    </TableRow>
                                    {/* Material List for each combo building */}
                                    {   
                                        combo.materialTypeOfComboDto.map((materialType, subIndex) => (
                                            <TableRow key={subIndex}>
                                                {/* Display Material Type */}
                                                <TableCell rowSpan={materialType.materialList.length} style={{ border: '1px solid #ddd' }}>{materialType.materialTypeDto.typeName}</TableCell>
                                                {/* Loop through materialList to display each material */}
                                                {materialType.materialList.map((material, innerIndex) => (
                                                    <TableCell key={innerIndex} style={{ border: '1px solid #ddd' }}>
                                                        {innerIndex === 0 ? material.materialName : ""}  {/* Display name only on first row for Material Type */}
                                                    </TableCell>
                                                ))}
                                                <TableCell style={{ border: '1px solid #ddd' }}>{materialType.materialList[0].unitPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</TableCell>
                                                <TableCell style={{ border: '1px solid #ddd' }}>{materialType.materialList[0].unit}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            ))}
                        </Table>
                    </TableContainer>
                )}
                <Pagination count={Math.ceil(getCombo.length / rowsPerPage)} page={currentPage} onChange={handleChangePage} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} />
                
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Link to="http://localhost:3000/home" style={{ backgroundColor: 'blue', padding: '10px 20px', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Back</Link> {/* Styled link to go back */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComboDetail;
