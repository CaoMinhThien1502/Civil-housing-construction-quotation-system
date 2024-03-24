import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const [getUserList, setUserList] = useState([]);
    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await response.json();
                setUserList(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUserList();
    }, []); // Empty dependency array to fetch data only once on component mount

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { 
            field: "userId", 
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "fullName",
            headerName: "Full Name",
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1.2,
        },
        {
            field: "role",
            headerName: "Role",
            renderCell: (params) => {
                const { value: role } = params; // Use `value` directly for clarity (optional)

                let color;
                switch (role) {
                    case 'ADMIN':
                        color = 'lightBlue';
                        break;
                    case 'MANAGER':
                        color = 'orange';
                        break;
                    case 'CUSTOMER':
                        color = 'lightGreen';
                        break;
                    default:
                        color = 'gray'; // Default color for unknown roles
                }

                return <Typography style={{ color }}>{role}</Typography>;
            },
        },
        {
            field: "phone",
            headerName: "Phone",
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1.5,
        },
        {
            field: "birthday",
            headerName: "Birthday",
        },
        {
            field: "gender",
            headerName: "Gender",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                const { row: { gender } } = params; // Extract the type value
                return gender === true ? "Male" : "Female";
            },
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
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
            field: "editRole",
            headerName: "Edit Role",
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => (
                <Link                    to={`/userList/${row.userId}`}
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
            <Header title="User List" subtitle="Managing the User List" />
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
                    rows={getUserList}
                    columns={columns}
                    getRowId={(row) => row.userId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default UserList;