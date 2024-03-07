import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ItemTypeDetail = () => {
    const {id} = useParams();
    const [item, setItem] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/building/item-type/id?typeId=${id}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                console.error('Error fetching material data:', error);
            });
    }, [id]);

    const [getMaterialType, setMaterialType] = useState([]);
    useEffect(() => {
        const fetchMaterialTypeById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material-type/getbyid?materialTypeId=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterialType(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterialTypeById();
    }, []); // Empty dependency array to fetch data only once on component mount

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" >
            <Header title="Material Type Detail" subtitle="View the Material Type Detail" />
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
                    <Typography variant="h3" gutterBottom>Material Type Detail Information</Typography>
                    {/* display material type data by {id} */}
                    <Typography variant="h5" gutterBottom>Material Type ID: {id}</Typography>
                    <Typography variant="h5" gutterBottom>Material Type Name: {getMaterialType.typeName}</Typography>
                    <Typography variant="h5" gutterBottom>Status: {getMaterialType.status === true ? "Active" : "Inactive"}</Typography>
                </Box>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/materialType")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom>Materials Included Information: </Typography>
                </Box>
                <DataGrid
                    rows={materialData} // Access the material list for each type
                    columns={[
                        { field: "materialId", headerName: "Material ID", flex: 1 },
                        { field: "materialName", headerName: "Material Name", flex: 1 },
                        { field: "unitPrice", headerName: "Unit Price", flex: 1 },
                        {
                            field: "status", headerName: "Status",
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
                />
            </Box>
        </Box>
    );
};

export default ItemTypeDetail;