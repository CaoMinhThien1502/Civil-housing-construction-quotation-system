import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { getComboBuilding, fetchComboBuildings } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';

const Team = () => {
    const [getComboBuilding, setComboBuildings] = useState([]);
    useEffect(() => {
        const fetchComboBuildings = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/combo-building/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setComboBuildings(data);
            } catch (error) {
                console.error('Error fetching combo buildings:', error);
            }
        };

        fetchComboBuildings();
    }, []); // Empty dependency array to fetch data only once on component mount

    console.log(getComboBuilding);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "comboBuildingId", headerName: "ID" },
        {
            field: "comboBuildingName",
            headerName: "Combo Building Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1,
            renderCell: (params) => {
                const { row: { type } } = params; // Extract the type value
                return type === 0 ? "Thô" : type === 1 ? "Hoàn thiện" : "Trọn gói";
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
            flex: 1,
            renderCell: ({ row }) => (
                <Button
                variant="contained"
                color="primary"
                href={`/combobuilding/${row.id}`}
                // Optional: Add other Button props like disableElevation, sx, etc.
                >
                  Detail
                </Button>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
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
                }}
            >
                <DataGrid 
                checkboxSelection 
                rows={getComboBuilding} 
                columns={columns} 
                getRowId={(row) => row.comboBuildingId}
                />
            </Box>
        </Box>
    );
};

export default Team;