import { Box, Typography, useTheme, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from 'axios';
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const RequestContract = () => {
    const [getRequestContract, setRequestContract] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dateMeet, setDateMeet] = useState('');
    const [placeMeet, setPlaceMeet] = useState('');

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        window.location.reload();
    };

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const fetchRequestContractList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/request-contract/request-contract/list', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data);
                setRequestContract(response.data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate)));
                setRowData(response.data.map(row => ({
                    ...row,
                    placeMeet: row.placeMeet || '',
                    dateMeet: row.dateMeet || ''
                })));
            } catch (error) {
                console.error('Error fetching request contract:', error);
            }
        };
        fetchRequestContractList();
    }, []);

    const handleConfirmRequest = async (requestContractId) => {
        try {
            const rowDataItem = rowData.find(row => row.requestContractId === requestContractId);
            if (rowDataItem) {
                const { dateMeet, placeMeet } = rowDataItem;
                if ((dateMeet !== null && dateMeet !== '') && (placeMeet !== null && placeMeet !== '')) {
                    const result = window.confirm("Are you sure you want to confirm this request?");
                    if (result) {
                        await axios.post(`http://localhost:8080/request-contract/request-contract/comfirm?requestContractId=${requestContractId}`, {
                            dateMeet: dateMeet,
                            placeMeet: placeMeet
                        });
                        setOpenSuccess(true);
                    }
                } else {
                    alert("Please enter values for Date Meet and Place before confirming.");
                }
            } else {
                alert("Request contract not found.");
            }
        } catch (error) {
            console.error('Error confirming request contract:', error);
        }
    };

    const handleDateMeetInputChange = (event, id) => {
        const { value } = event.target;
        setRowData(prevState =>
            prevState.map(row =>
                row.requestContractId === id ? { ...row, dateMeet: value } : row
            )
        );
        // Cập nhật state dateMeet
        setDateMeet(value);
    };

    const handlePlaceInputChange = (event, id) => {
        const { value } = event.target;
        setRowData(prevState =>
            prevState.map(row =>
                row.requestContractId === id ? { ...row, placeMeet: value } : row
            )
        );
        // Cập nhật state placeMeet
        setPlaceMeet(value);
    };

    const columns = [
        {
            field: "requestContractId",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
        },
        {
            field: "userName",
            headerName: "Creator",
            cellClassName: "name-column--cell",
            flex: 0.8,
        },
        {
            field: "comboName",
            headerName: "Combo selected",
            flex: 0.8,
        },
        {
            field: "totalPrice",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => {
                const { value } = params; // Use `value` directly for clarity (optional)
                return value.toLocaleString('vi', { style: 'currency', currency: 'VND' });
            },
        },
        {
            field: "buildingDetail.status",
            headerName: "Type",
            headerAlign: "center",
            align: "center",
            flex: 0.8,
            renderCell: (params) => {
                const buildingStatus = params.row.buildingDetail.status;
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
                const { value: status } = params; // Use `value` directly for clarity (optional)

                const color = status === true ? 'lightGreen' : 'orange'; // Concise conditional color assignment
                const text = status === true ? 'Confirmed' : 'Pending'; // Maintain separate text variable

                return (
                    <Typography style={{ color }}>{text}</Typography>
                );
            },
        },
        {
            field: "requestDate",
            headerName: "Request Date",
            flex: 0.7,
        },
        {
            field: "dateMeet",
            headerName: "Date Meet",
            flex: 1.3,
            renderCell: (params) => (
                <TextField
                    type="date"
                    value={rowData.find(row => row.requestContractId === params.row.requestContractId)?.dateMeet || ''}
                    onChange={(event) => handleDateMeetInputChange(event, params.row.requestContractId)}
                />
            )
        },
        {
            field: "place",
            headerName: "Place",
            flex: 1.3,
            renderCell: (params) => (
                <TextField
                    type="text"
                    value={rowData.find(row => row.requestContractId === params.row.requestContractId)?.placeMeet || ''}
                    onChange={(event) => handlePlaceInputChange(event, params.row.requestContractId)}
                />
            )
        },
        {
            field: "setting",
            headerName: "Setting",
            headerAlign: "center",
            align: "center",
            flex: 0.8,
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
            flex: 1.2,
            renderCell: ({ row }) => (
                row.status ? (
                    <Typography variant="body2" color="textSecondary">
                        Already confirmed
                    </Typography>
                ) : (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleConfirmRequest(row.requestContractId)}
                    >
                        Confirm request
                    </Button>
                )
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
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    sx={{ fontSize: 15 }}
                >
                    Confirm Request successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RequestContract;
