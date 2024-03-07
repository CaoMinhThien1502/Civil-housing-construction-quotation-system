import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';

import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}>
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [isLoading, setIsLoading] = useState(false); // Optional state to indicate data fetching

    const userDataDemo = { "userId": 8, "fullName": "Admin", "password": "$2a$10$cC8eSPyEWIOi/COXCTJSquAJCSKhpHZJ9qvleS8iEgPDmpHLVrX0i", "email": "admin@gmail.com", "role": "ADMIN", "phone": "0000000000", "address": "Admin", "birthday": "1998-05-06", "gender": true, "status": true };
    
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);

    // axios.interceptors.request.use((request) => {
    //     console.log(request);
    //     return request;
    // });

    // axios.interceptors.response.use((response) => {
    //     console.log(response);
    //     return response;
    // });


    // const [userData, setUserData] = useState({});
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         setIsLoading(true); // Set loading state to indicate data is being fetched

    //         try {
    //             const response = await axios.get('http://localhost:8080/user/userlogin');

    //             if (response.status !== 200) {
    //                 throw new Error(`API request failed with status ${response.status}`);
    //             }

    //             setUserData(response.data);
    //             console.log('User data:', response.data); // Log the response data
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //             // Handle errors gracefully
    //             setUserData({ error: error.message }); // Set error state for displaying
    //         } finally {
    //             setIsLoading(false); // Set loading state to false after fetching completes (optional)
    //         }
    //     };

    //     fetchUserData();
    // }, []); // Empty dependency array for one-time fetch on mount

    // const [error, setError] = useState(null);
    // const fetchUserData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/user/userlogin');

    //         console.log("Response status:", response.status);
    //         console.log("Response data:", response.data);

    //         if (response.status === 200) {
    //             console.log("get user data successfully!");
    //         } else {
    //             setError(`get user data failed with status: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.log("Error fetching user data:", error);
    //     }
    // }

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    Civil Housing
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {userDataDemo.fullName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    VP Fancy Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Home Page"
                            to="/home"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Dashboard"
                            to="/dashboard"
                            icon={<AccountBoxOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Combo Building
                        </Typography>
                        {/* <Item
                            title="Manage Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
                        <Item
                            title="Combo Building List"
                            to="/comboBuilding"
                            icon={<BusinessOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <Item
                                title="Contacts Information"
                                to="/contacts"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> */}
                        {/* <Item
                            title="Invoices Balances"
                            to="/invoices"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Material
                        </Typography>
                        <Item
                            title="Material List"
                            to="/materialList"
                            icon={<FormatListBulletedOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Material Type"
                            to="/materialType"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Item In Constructor
                        </Typography>
                        <Item
                            title="Item List"
                            to="/item"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Item Type"
                            to="/itemType"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <button onClick={fetchUserData}>Get User Data</button> */}
                        {/* <Item
                            title="Profile Form"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Calendar"
                            to="/calendar"
                            icon={<CalendarTodayOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}

                        {/* <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Charts
                        </Typography>
                        <Item
                            title="Bar Chart"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pie Chart"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Line Chart"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Geography Chart"
                            to="/geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        /> */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;