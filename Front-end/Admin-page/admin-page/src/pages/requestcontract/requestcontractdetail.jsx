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

const RequestContractDetail = () => {
    const { id } = useParams();
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
    console.log(requestContractData);

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleStart = () => {
        // Xử lý khi người dùng nhấn nút "Nhấn Start"
    };

    const handleCheck = () => {
        // Xử lý khi người dùng nhấn nút "Check"
    };

    const handleFinish = () => {
        // Xử lý khi người dùng nhấn nút "Finish"
    };


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
                {/* display the Request Contract detail info from api */}
                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                        Request Contract Detail Information
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.requestContractId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Creator:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.userName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Phone:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.phone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Email:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Combo selected:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.comboName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Price:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.totalPrice}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Status:</TableCell>
                                <TableCell sx={{ fontSize: 15, color: requestContractData?.status === true ? "lightGreen" : "orange" }}>{requestContractData?.status === true ? "Confirmed" : "Pending"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                        Architecture
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.buildingDetailId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Area:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.area}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Kitchen:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOKitchen}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Bathroom:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOBathroom}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Bedroom:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOBedroom}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Floor:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.numOFloor}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Tunnel:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.hasTunnel ? "Has Tunnel" : "No Tunnel"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>Process:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{requestContractData?.buildingDetail.status === -1 ? "Mẫu" : requestContractData?.buildingDetail.status === 0 ? "Hủy" : requestContractData?.buildingDetail.status === 1 ? "Đang thi công" : "Đã xong"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>



                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/requestContractList")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RequestContractDetail;