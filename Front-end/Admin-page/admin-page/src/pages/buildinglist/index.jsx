import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BuildingList = () => {
    const [getBuildingList, setBuildingList] = useState([]);
    useEffect(() => {
        const fetchBuildingList = async () => {
            try {
                const response = await fetch('http://localhost:8080/building/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBuildingList(data);
            } catch (error) {
                console.error('Error fetching buildings:', error);
            }
        };

        fetchBuildingList();
    }, []); // Empty dependency array to fetch data only once on component mount

    console.log(getBuildingList);

    const navigate = useNavigate();
    // const handleRowClick = (row) => {
    //     navigate(`/combobuilding/${row.id}`); // Navigate to the desired URL
    // };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { 
            field: "buildingId", 
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "buildingName",
            headerName: "Building Name",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "percentPrice",
            headerName: "Percent Price",
            flex: 1,
            renderCell: (params) => {
                const { value } = params;
                // return value with %
                return value + '%';
            },
        },
        // {
        //     field: "buildingType", // Access the entire buildingType object
        //     headerName: "Type",
        //     flex: 1,
        //     renderCell: ({ value }) => ( // Use renderCell to extract buildingTypeName
        //         value ? value.buildingTypeName : '-' // Handle potential undefined value
        //     ),
        // },
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
                <Link                    to={`/buildingList/${row.buildingId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button color="primary" variant="contained">
                        Edit
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="Building List" subtitle="Managing the Building List" />
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
                    <Button onClick={() => navigate("/buildingList/addBuilding")} color="secondary" variant="contained">
                        Add Building
                    </Button>
                </Box>
                <DataGrid
                    rows={getBuildingList}
                    columns={columns}
                    getRowId={(row) => row.buildingId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default BuildingList;