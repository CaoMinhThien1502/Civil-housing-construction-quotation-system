import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Blog = () => {
    const [getBlog, setBlog] = useState([]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:8080/blog/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlogs();
    }, []); // Empty dependency array to fetch data only once on component mount

    console.log(getBlog);

    const navigate = useNavigate();

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "blogId",
            headerName: "ID",
            headerAlign: "center",
            align: "center",
        },
        {
            field: "blogName",
            headerName: "Blog Name",
            cellClassName: "name-column--cell",
            flex: 1,
        },
        {
            field: "blogType",
            headerName: "Type",
            flex: 1,
            renderCell: (params) => {
                const { value: type } = params; // Extract the type value
                return type === 1 ? "Cẩm nang xây dựng" : "Thiết Kế Kiến Trúc"
            },
        },
        {
            field: "createDay",
            headerName: "Date",
            flex: 1,
        },
        // {
        //     field: "status",
        //     headerName: "Status",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     renderCell: (params) => {
        //         const { row: { status } } = params; // Extract the type value
        //         return status === true ? "Active" : "Inactive";
        //     },
        // },
        {
            field: "setting",
            headerName: "Setting",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ row }) => (
                <Link
                    to={`/blogList/${row.blogId}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button color="primary" variant="contained">
                        Edit
                    </Button>
                </Link>
            ),
        // },
        // {
        //     field: "detail",
        //     headerName: "Detail",
        //     headerAlign: "center",
        //     align: "center",
        //     flex: 1,
        //     renderCell: ({ row }) => (
        //         <Link
        //             to={`/comboBuilding/detail/${row.comboBuildingId}`}
        //             style={{ textDecoration: 'none' }}
        //         >
        //             <Button color="primary" variant="contained">
        //                 Detail
        //             </Button>
        //         </Link>
        //     ),
        },
    ];

    return (
        <Box m="20px" >
            <Header title="Blog List" subtitle="Managing the Blog List" />
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
                    <Button onClick={() => navigate("/blogList/addBlog")} color="secondary" variant="contained">
                        Add Blog
                    </Button>
                </Box>
                <DataGrid
                    rows={getBlog}
                    columns={columns}
                    getRowId={(row) => row.blogId}
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

export default Blog;