import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';

const RequestContractDetail = () => {
    const {id} = useParams(); 
    const [requesContractData, setRequesContractData] = useState(null); 
    useEffect(() => {
        axios.get(`http://localhost:8080/request-contract/request-contract/get/id?id=${id}`)
            .then(response => {
                setRequesContractData(response.data);
            })
            .catch(error => {
                console.error('Error fetching combo data:', error);
            });
    }, [id]);
    console.log(requesContractData);

    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


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
                    <Typography variant="h3" gutterBottom>Combo Detail Information</Typography>
                    <Typography variant="h5" gutterBottom>ID: {requesContractData?.requestContractId}</Typography>
                    <Typography variant="h5" gutterBottom>Creator: {requesContractData?.userName}</Typography>
                    <Typography variant="h5" gutterBottom>Phone: {requesContractData?.phone}</Typography>
                    <Typography variant="h5" gutterBottom>Email: {requesContractData?.email}</Typography>
                    <Typography variant="h5" gutterBottom>Combo selected: {requesContractData?.comboName}</Typography>
                    <Typography variant="h5" gutterBottom>Status: {requesContractData?.status === true ? "Active" : "Inactive"}</Typography>
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom>Building Information</Typography>
                    <Typography variant="h5" gutterBottom>ID: {requesContractData?.buildingDto.buildingId}</Typography>
                    <Typography variant="h5" gutterBottom>Area: {requesContractData?.buildingDto.landArea}</Typography>
                    <Typography variant="h5" gutterBottom>Price: {requesContractData?.totalPrice}</Typography>
                    <Typography variant="h5" gutterBottom>Structure of Building: 
                    {requesContractData?.buildingDto.itemNameList[0]}, 
                    {requesContractData?.buildingDto.itemNameList[1]}, 
                    {requesContractData?.buildingDto.itemNameList[2]}, 
                    {requesContractData?.buildingDto.itemNameList[3]}, 
                    {requesContractData?.buildingDto.itemNameList[4]}</Typography>
                    <Typography variant="h5" gutterBottom>Status: 
                    {requesContractData?.buildingDto.status === -1 ? "Mẫu": requesContractData?.buildingDto.status === 0 ? "Hủy" : requesContractData?.buildingDto.status === 1 ? "Đang thi công" : "Đã xong"}</Typography>
                </Box>

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