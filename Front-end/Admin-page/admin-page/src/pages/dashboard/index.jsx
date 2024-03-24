import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import { PersonAdd, RequestQuote, Roofing, ViewInAr } from "@mui/icons-material";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [getTotalData, setTotalData] = useState({});
    useEffect(() => {
        const fetchTotalData = async () => {
            try {
                const response = await fetch('http://localhost:8080/dashboard/numbers', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setTotalData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTotalData();
    }, []); // Empty dependency array to fetch data only once on component mount
    
    const [getRequestContract, setRequestContract] = useState([]);
    useEffect(() => {
        const fetchRequestContract = async () => {
            try {
                const response = await fetch('http://localhost:8080/request-contract/request-contract/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                // Sort data by requestDate in descending order (most recent first)
                const sortedData = data.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

                setRequestContract(sortedData);
            } catch (error) {
                console.error('Error fetching request contract:', error);
            }
        };

        fetchRequestContract();
    }, []); // Empty dependency array to fetch data only once on component mount

    // const extraCost = getTotalData.request_contract_count * (200000 * 5 / 100);
    // const totalRevenue = getTotalData.request_contract_count * 200000 + extraCost;
    
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                {/* <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box> */}
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={getTotalData.material_count}
                        subtitle="Total Materials"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <ViewInAr
                                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={getTotalData.item_count}
                        subtitle="Total Items"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <Roofing
                                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={getTotalData.request_contract_count}
                        subtitle="Contracts Requested"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <RequestQuote
                                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={getTotalData.user_count}
                        subtitle="Users Registered"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <PersonAdd
                                sx={{ color: colors.greenAccent[600], fontSize: "30px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                {/* <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Revenue Generated
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                $59,342.32
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box> */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                            Recent Contracts
                        </Typography>
                    </Box>
                    {getRequestContract.map((transaction, i) => (
                        <Box
                            key={`${transaction.requestContractId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="500"
                                    width={200}
                                >
                                    {transaction.comboName}
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {transaction.userName}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]} >{transaction.requestDate}</Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {(transaction.totalPrice)?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* ROW 3 */}
                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Campaign
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            {totalRevenue.toLocaleString('vi', {style : 'currency', currency : 'VND'})} revenue generated
                        </Typography>
                        <Typography>Includes {extraCost.toLocaleString('vi', {style : 'currency', currency : 'VND'})} extra misc expenditures and costs</Typography>
                    </Box>
                </Box> */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                    mb="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Item Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                {/* <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ marginBottom: "15px" }}
                    >
                        Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                        <GeographyChart isDashboard={true} />
                    </Box>
                </Box> */}
            </Box>
        </Box>
    );
};

export default Dashboard;