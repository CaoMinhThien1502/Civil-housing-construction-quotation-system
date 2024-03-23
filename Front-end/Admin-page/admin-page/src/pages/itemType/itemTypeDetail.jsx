import { Box, Typography, useTheme, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ItemTypeDetail = () => {
    const {id} = useParams();
    // const [itemData, setItemData] = useState([]);
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/combobuilding/item/getByItemTypeId?itemTypeId=${id}`)
    //         .then(response => {
    //             setItemData(response.data);
    //             console.log("Item Data:", response.data)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching item data:', error);
    //         });
    // }, [id]);

    const [getItemType, setItemType] = useState([]);
    useEffect(() => {
        const fetchItemTypeById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/building/item-type/id?typeId=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setItemType(data);
            } catch (error) {
                console.error('Error fetching item type:', error);
            }
        };

        fetchItemTypeById();
    }, []); // Empty dependency array to fetch data only once on component mount
    const items = getItemType?.items || [];

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px" >
            <Header title="Item Type Detail" subtitle="View the Item Type Detail" />
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
                {/* display many materials detail info from api using map */}
                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom sx={{ display: "flex", justifyContent: "center" }}>
                        Item Type Detail Information
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, width: "50%", color: "#4cceac" }}>ID:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{getItemType?.itemTypeId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Name:</TableCell>
                                <TableCell sx={{ fontSize: 15 }}>{getItemType?.itemTypeName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontSize: 15, color: "#4cceac" }}>Status:</TableCell>
                                <TableCell sx={{ fontSize: 15, color: getItemType?.status === true ? "lightGreen" : "orangeRed" }}>{getItemType?.status === true ? "Active" : "Inactive"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button onClick={() => navigate("/itemType")} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                    <Typography variant="h3" gutterBottom>Items Included Information: </Typography>
                </Box>
                <DataGrid
                    rows={items}
                    columns={[
                        { field: "itemId", headerName: "Item ID", flex: 1 },
                        { field: "itemName", headerName: "Item Name", flex: 1 },
                        { field: "priceItem", headerName: "Item Price", flex: 1 },
                        {
                            field: "status", headerName: "Status",
                            renderCell: (params) => {
                                const { row: { status } } = params; // Extract the type value
                                return status === true ? "Active" : "Inactive";
                            },
                        },
                    ]}
                    getRowId={(row) => row.itemId}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </Box>
        </Box>
    );
};

export default ItemTypeDetail;