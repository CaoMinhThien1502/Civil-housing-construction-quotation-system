import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BuildingType = () => {
    const [getBuildingTypeList, setBuildingTypelList] = useState([]);
    useEffect(() => {
        const fetchBuildingTypelList = async () => {
            try {
                const response = await fetch('http://localhost:8080/building/type/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBuildingTypelList(data);
            } catch (error) {
                console.error('Error fetching building types:', error);
            }
        };

        fetchBuildingTypelList();
    }, []); // Empty dependency array to fetch data only once on component mount

    console.log(getBuildingTypeList);

    const navigate = useNavigate();
    // const handleRowClick = (row) => {
    //     navigate(`/combobuilding/${row.id}`); // Navigate to the desired URL
    // };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { 
            field: "buildingTypeId", 
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "buildingTypeName",
            headerName: "Building Type Name",
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
                const { value: status } = params; // Use `value` directly for clarity (optional)

                const color = status === true ? 'lightGreen' : 'orangeRed'; // Concise conditional color assignment
                const text = status === true ? 'Active' : 'Inactive'; // Maintain separate text variable

                return (
                    <Typography style={{ color }}>{text}</Typography>
                );
            },
        },
        {
            field: "setting",
            headerName: "Setting",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Link                    to={`/buildingType/${row.buildingTypeId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button color="primary" variant="contained">
                        Edit
                    </Button>
                </Link>
            ),
        },
        {
            field: "detail",
            headerName: "Detail",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Link
                    to={`/buildingType/detail/${row.buildingTypeId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button color="primary" variant="contained">
                        Detail
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="Building Type List" subtitle="Managing the Building Type List" />
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
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/buildingType/addBuildingType")} color="secondary" variant="contained">
                        Add Building type
                    </Button>
                </Box>
                <DataGrid
                    rows={getBuildingTypeList}
                    columns={columns}
                    getRowId={(row) => row.buildingTypeId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default BuildingType;