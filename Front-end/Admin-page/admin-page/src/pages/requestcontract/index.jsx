import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from 'axios';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RequestContract = () => {
    const [getRequestContract, setRequestContract] = useState([]);
    //const {id} = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchRequestContractList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/request-contract/request-contract/list', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setRequestContract(response.data);
            } catch (error) {
                console.error('Error fetching request contract:', error);
            }
        };
        fetchRequestContractList();
    }, []);
    const handleConfirmRequest = async (requestContractId) => {
        try {
            await axios.post(`http://localhost:8080/request-contract/request-contract/comfirm?requestContractId=${requestContractId}`);
            // Điều hướng lại trang sau khi xác nhận thành công
            navigate("/requestContractList");
        } catch (error) {
            console.error('Error confirming request contract:', error);
        }
    };

    const columns = [
        { 
            field: "requestContractId", 
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "userName",
            headerName: "Creator",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "comboName",
            headerName: "Combo selected",
            flex: 1,
        },
        {
            field: "buildingDto.status",
            headerName: "Type of building",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                const buildingStatus = params.row.buildingDto.status;
                return buildingStatus === -1 ? "Mẫu" : buildingStatus === 0 ? "Hủy" : buildingStatus === 1 ? "Đang thi công" : "Đã xong";
            },
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => {
                const { row: { status } } = params;
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
                    to={`/requestContractList/detail/${row.requestContractId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button color="primary" variant="contained">
                        Detail
                    </Button>
                </Link>
            ),
        },
        {
            field: "confirm",
            headerName: "Confirm",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Button 
                    color="primary" 
                    variant="contained" 
                    onClick={() => handleConfirmRequest(row.requestContractId)}
                >
                    Confirm request
                </Button>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="Request Contract List" subtitle="Managing the Request Contract List" />
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
                <DataGrid
                    rows={getRequestContract}
                    columns={columns}
                    getRowId={(row) => row.requestContractId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default RequestContract;
