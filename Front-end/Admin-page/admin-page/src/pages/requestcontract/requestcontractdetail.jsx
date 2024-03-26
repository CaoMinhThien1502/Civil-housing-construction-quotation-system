import { Box, Typography, useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const RequestContractDetail = () => {
    const { id } = useParams();

    const [openSuccessStart, setOpenSuccessStart] = useState(false);
    const handleCloseSuccessStart = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessStart(false);
        window.location.reload();
    };

    const [openSuccessCheck, setOpenSuccessCheck] = useState(false);
    const handleCloseSuccessCheck = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessCheck(false);
        window.location.reload();
    };

    const [openSuccessFinish, setOpenSuccessFinish] = useState(false);
    const handleCloseSuccessFinish = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessFinish(false);
        window.location.reload();
    };

    const [requestContractData, setRequestContractData] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8080/request-contract/request-contract/get/id?id=${id}`)
            .then(response => {
                setRequestContractData(response.data);
            })
            .catch(error => {
                console.error('Error fetching combo data:', error);
            });
    }, [id]);
    // console.log(requestContractData);

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleStart = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/building/detail/start-date?buildingDetailID=${requestContractData?.buildingDetail.buildingDetailId}`);
            // console.log(response.data);
            // Xử lý khi gọi API thành công
            setOpenSuccessStart(true);
        } catch (error) {
            console.error('Error fetching start date:', error);
        }
    };

    const handleCheck = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/building/detail/check-date?buildingDetailID=${requestContractData?.buildingDetail.buildingDetailId}`);
            // console.log(response.data);
            // Xử lý khi gọi API thành công
            setOpenSuccessCheck(true);
        } catch (error) {
            console.error('Error fetching check date:', error);
        }
    };
    
    const handleFinish = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/building/detail/finish-date?buildingDetailID=${requestContractData?.buildingDetail.buildingDetailId}`);
            // console.log(response.data);
            // Xử lý khi gọi API thành công
            setOpenSuccessFinish(true);
        } catch (error) {
            console.error('Error fetching finish date:', error);
        }
    };

    // const [getCustomCombo, setCustomCombo] = useState([]);
    // useEffect(() => {
    //     const fetchCustomComboByRequestContractId = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/custom-combo/get?requestContractId=${id}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     // 'Access-Control-Allow-Origin': '*',
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             const data = await response.json();
    //             setCustomCombo(data);
    //             console.log(data)
    //         } catch (error) {
    //             console.error('Error fetching custom combo:', error);
    //         }
    //     };

    //     fetchCustomComboByRequestContractId();
    // }, []); // Empty dependency array to fetch data only once on component mount
    // const combos = getCustomCombo?.mateList || [];
    // // sort by mateTypeId
    // combos.sort((a, b) => a.mateTypeId - b.mateTypeId);
    // console.log(combos)

    return (
        <Box m="20px" >
            <Header title="Request Contract Detail" subtitle="View the Request Contract Detail" />
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "25%" }}>
                                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                                        Request Contract Information 
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ fontSize: 15, width: "25%" }}></TableCell>
                                <TableCell sx={{ fontSize: 15, width: "25%" }}>
                                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                                        Architecture Detail Information
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ fontSize: 15, width: "25%" }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.requestContractId}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.buildingDetailId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Creator:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.userName}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Area:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.area}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Phone:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.phone}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Kitchen:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOKitchen}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Email:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.email}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Bathroom:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOBathroom}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Combo selected:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.comboName}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Bedroom:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOBedroom}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Price:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.totalPrice}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Floor:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOFloor}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Status:</TableCell>
                                <TableCell sx={{ fontSize: 15, color: requestContractData?.status === true ? "lightGreen" : "orange" }}>{requestContractData?.status === true ? "Confirmed" : "Pending"}</TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Tunnel:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.hasTunnel ? "Has Tunnel" : "No Tunnel"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}></TableCell>
                                <TableCell sx={{ fontSize: 15 }}></TableCell>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Process:</TableCell>
                                <TableCell sx={{ fontSize: 15, color: requestContractData?.buildingDetail.status === 2 ? "lightGreen" : "orange" }}>{requestContractData?.buildingDetail.status === -1 ? "Mẫu" : requestContractData?.buildingDetail.status === 0 ? "Hủy" : requestContractData?.buildingDetail.status === 1 ? "Đang thi công" : "Đã xong"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
                <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                    Manage Process
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Start Date:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.startDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Check Date:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.checkDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Finish Date:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.finishDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Action:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>
                                    {requestContractData?.buildingDetail.startDate === null ? (
                                        <Button color="primary" variant="contained" onClick={handleStart}>
                                            Start
                                        </Button>
                                    ) : requestContractData?.buildingDetail.finishDate !== null ? null : (
                                        <>
                                            <Button color="primary" variant="contained" onClick={handleCheck}>
                                                Check
                                            </Button>
                                            <Button color="primary" variant="contained" onClick={handleFinish}>
                                                Finish
                                            </Button>
                                        </>
                                    )}
                                    {requestContractData && requestContractData.buildingDetail.startDate !== null && requestContractData.buildingDetail.finishDate !== null ? 'Complete' : null}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box> */}
                {/* <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>Combo: {getCustomCombo.comboName}</Typography>
                </Box> */}
                {/* <DataGrid
                    rows={combos}
                    columns={[
                        { field: "mateTypeId", headerName: "Material Type ID", flex: 0.5 },
                        { field: "mateTypeName", headerName: "Material Type Name", flex: 1.5 },
                        { field: "mateId", headerName: "Material ID", flex: 0.5,
                            renderCell: (params) => {
                                const mateId = params.row.mate.mateId; // Extract the type value
                                return mateId;
                            }
                        },
                        { field: "mateName", headerName: "Material Name", flex: 1.5,
                            renderCell: (params) => {
                                const mateName = params.row.mate.mateName; // Extract the type value
                                return mateName;
                            }
                        },
                        { field: "matePrice", headerName: "Material Price", flex: 1,
                            renderCell: (params) => {
                                const matePrice = params.row.mate.matePrice; // Extract the type value
                                return matePrice?.toLocaleString('vi', {style : 'currency', currency : 'VND'});
                            }
                        }
                    ]}
                    getRowId={(row) => row.mateTypeId}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                /> */}
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/requestContractList")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>
                <Box sx={{ gridColumn: "span 4" }}>&nbsp;</Box>
            </Box>
            <Snackbar open={openSuccessStart} autoHideDuration={3000} onClose={handleCloseSuccessStart} >
                <Alert
                    onClose={handleCloseSuccessStart}
                    severity="success"
                    sx={{ fontSize: 15 }}
                >
                    Start Date has been confirmed!
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessCheck} autoHideDuration={3000} onClose={handleCloseSuccessCheck} >
                <Alert
                    onClose={handleCloseSuccessCheck}
                    severity="success"
                    sx={{ fontSize: 15 }}
                >
                    Check Date has been confirmed!
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessFinish} autoHideDuration={3000} onClose={handleCloseSuccessFinish} >
                <Alert
                    onClose={handleCloseSuccessFinish}
                    severity="success"
                    sx={{ fontSize: 15 }}
                >
                    Finish Date has been confirmed!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RequestContractDetail;