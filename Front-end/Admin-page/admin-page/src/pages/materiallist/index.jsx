import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const MaterialList = () => {
    const [getMaterialList, setMaterialList] = useState([]);
    useEffect(() => {
        const fetchMaterialList = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/material/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterialList(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterialList();
    }, []); // Empty dependency array to fetch data only once on component mount

    console.log(getMaterialList);

    const navigate = useNavigate();
    // const handleRowClick = (row) => {
    //     navigate(`/combobuilding/${row.id}`); // Navigate to the desired URL
    // };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { 
            field: "materialId", 
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "materialName",
            headerName: "Material Name",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "unitPrice",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => {
                const { value } = params;
                return value?.toLocaleString('vi', {style : 'currency', currency : 'VND'});
            },
        },
        {
            field: "unit",
            headerName: "Unit",
            flex: 1,
        },
        {
            field: "materialTypeName",
            headerName: "Type",
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
                <Link
                    to={`/materialList/${row.materialId}`}
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
            <Header title="Material List" subtitle="Managing the Material List" />
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
                    <Button onClick={() => navigate("/materialList/addMaterial")} color="secondary" variant="contained">
                        Add Material
                    </Button>
                </Box>
                <DataGrid
                    rows={getMaterialList}
                    columns={columns}
                    getRowId={(row) => row.materialId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default MaterialList;