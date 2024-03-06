import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const ComboBuilding = () => {
    const [getComboBuilding, setComboBuildings] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
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
            field: "setting",
            headerName: "Setting",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Link
                    to={`/comboBuilding/${row.comboBuildingId}`}
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
                    to={`/comboBuilding/detail/${row.comboBuildingId}`}
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
        <Box m="20px" >
            <Header title="Combo Building List" subtitle="Managing the Combo Building List" />
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
                    <Button onClick={() => navigate("/comboBuilding/addComboBuilding")} color="secondary" variant="contained">
                        Add Combo Building
                    </Button>
                </Box>
                <DataGrid
                    rows={getComboBuilding}
                    columns={columns}
                    getRowId={(row) => row.comboBuildingId}
                    components={{ Toolbar: GridToolbar }}
                    onSelectionModelChange={(selectionModel) => {
                        setSelectedRowIds(selectionModel);
                    }}
                    disableRowSelectionOnClick={false}
                />
            </Box>
        </Box>
    );
};

export default ComboBuilding;