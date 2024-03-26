import { Box, Typography, useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const BuildingTypeDetail = () => {
    const {id} = useParams();

    const [getBuildingType, setBuildingType] = useState([]);
    useEffect(() => {
        const fetchBuildingTypeById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/building/type/get?buildingTypeId=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBuildingType(data);
            } catch (error) {
                console.error('Error fetching building type:', error);
            }
        };

        fetchBuildingTypeById();
    }, []); // Empty dependency array to fetch data only once on component mount
    const buildings = getBuildingType?.buildings || [];

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" >
            <Header title="Building Type Detail" subtitle="View the Building Type Detail" />
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
                {/* display many materials detail info from api using map */}
                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                        Building Type Detail Information
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{getBuildingType?.buildingTypeId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Name:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{getBuildingType?.buildingTypeName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Status:</TableCell>
                                <TableCell sx={{ fontSize: 15, color: getBuildingType?.status === true ? "lightGreen" : "orangeRed" }}>{getBuildingType?.status === true ? "Active" : "Inactive"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/buildingType")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>Buildings Included Information</Typography>
                </Box>
                <DataGrid
                    rows={buildings}
                    columns={[
                        { field: "buildingId", headerName: "Building ID", flex: 1 },
                        { field: "buildingName", headerName: "Building Name", flex: 1 },
                        { field: "percentPrice", headerName: "Percent Price", flex: 1,
                            renderCell: (params) => {
                                const { row: { percentPrice } } = params; // Extract the type value
                                return percentPrice + "%";
                            },
                        },
                        {
                            field: "status", headerName: "Status",
                            renderCell: (params) => {
                                const { row: { status } } = params; // Extract the type value
                                return status === true ? "Active" : "Inactive";
                            },
                        },
                    ]}
                    getRowId={(row) => row.buildingId}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
            </Box>
        </Box>
    );
};

export default BuildingTypeDetail;