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

const ComboBuildingDetail = () => {
    const [getComboBuilding, setComboBuildings] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);

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
    console.log(comboData)

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "comboBuildingId",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "comboBuildingName",
            headerName: "Combo Building Name",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                const { row: { status } } = params; // Extract the type value
                return status === true ? "Active" : "Inactive";
            },
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            renderCell: (params) => {
                const { row: { type } } = params; // Extract the type value
                return type === 0 ? "Xây nhà phần thô" : type === 1 ? "Xây nhà hoàn thiện" : "Xây dựng trọn gói";
            },
        },
        {
            field: "unitPrice",
            headerName: "Price",
            flex: 1,
        },
        {
            field: "detail",
            headerName: "Detail",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Link
                    to={`/comboBuilding/${row.comboBuildingId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <span style={{ color: 'white', padding: '5px 10px', backgroundColor: '#e06262', borderRadius: '5px' }}>Detail</span>
                </Link>
            ),
        },
    ];

    return (
        <Box m="20px" >
            <Header title="Combo Building Detail" subtitle="Managing the Combo Building Detail" />
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
                    <Typography variant="h3" gutterBottom>Combo Detail Information</Typography>
                    <Typography variant="h5" gutterBottom>Combo Building ID: {comboData?.comboBuildingId}</Typography>
                    <Typography variant="h5" gutterBottom>Combo Building Name: {comboData?.comboBuildingName}</Typography>
                    <Typography variant="h5" gutterBottom>Combo Building Status: {comboData?.status === true ? "Active" : "Inactive"}</Typography>
                    <Typography variant="h5" gutterBottom>Combo Building Type: {comboData?.type === 0 ? "Xây nhà phần thô" : comboData?.type === 1 ? "Xây nhà hoàn thiện" : "Xây dựng trọn gói"}</Typography>
                    <Typography variant="h5" gutterBottom>Combo Building Price: {comboData?.unitPrice}</Typography>
                </Box>
                
                {/* add some spaces */}
                <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
                <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom>Combo Material Information</Typography>
                </Box>
                {comboData?.materialTypeOfComboDto.map((materialType) => (
                    <Box key={materialType.materialTypeId} sx={{ gridColumn: "span 4" }}>
                        {/* add some spaces between items */}
                        
                        
                        <Typography variant="h5" gutterBottom>Material Type Name: {materialType.materialTypeDto.typeName}</Typography>
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
                        <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ComboBuildingDetail;