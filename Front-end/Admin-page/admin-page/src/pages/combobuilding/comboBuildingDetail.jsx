import { Box, Typography, useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ComboBuildingDetail = () => {
    const {id} = useParams(); 
    const [comboData, setComboData] = useState(null); 
    useEffect(() => {
        axios.get(`http://localhost:8080/combobuilding/combo/getbyid?comboBuildingId=${id}`)
            .then(response => {
                setComboData(response.data);
            })
            .catch(error => {
                console.error('Error fetching combo data:', error);
            });
    }, [id]);
    console.log(comboData);

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" >
            <Header title="Combo Building Detail" subtitle="View the Combo Building Detail" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                {/* display the combo building detail info from api */}
                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                        Combo Detail Information
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac"  }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15}}>{comboData?.comboBuildingId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Name:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{comboData?.comboBuildingName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Status:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{comboData?.status === true ? "Active" : "Inactive"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Type:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>
                                    {comboData?.type === 0
                                        ? "Xây nhà phần thô"
                                        : comboData?.type === 1
                                            ? "Xây nhà hoàn thiện"
                                            : "Xây dựng trọn gói"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Price:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{comboData?.unitPrice}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/comboBuilding")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>Combo Material Information</Typography>
                </Box>
                {comboData?.materialTypeOfComboDto.map((materialType) => (
                    <Box key={materialType.materialTypeId} sx={{ gridColumn: "span 4" }}>
                        <Typography variant="h5" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>Material Type Name: {materialType.materialTypeDto.typeName}</Typography>
                        <DataGrid
                            rows={materialType.materialList} // Access the material list for each type
                            columns={[
                                { field: "materialId", headerName: "Material ID", flex: 1 },
                                { field: "materialName", headerName: "Material Name", flex: 1 },
                                { field: "unitPrice", headerName: "Unit Price", flex: 1 },
                                { field: "status", headerName: "Status", 
                                renderCell: (params) => {
                                        const { row: { status } } = params; // Extract the type value
                                        return status === true ? "Active" : "Inactive";
                                    },
                                },
                                // Add other fields as needed
                            ]}
                            getRowId={(row) => row.materialId}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        // ...other DataGrid props
                        />
                        {/* add some spaces between material types */}
                        <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ComboBuildingDetail;