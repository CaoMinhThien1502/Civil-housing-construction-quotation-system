import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [getTotalData, setTotalData] = useState([]);
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
                const chartData = data.listBuildingChoice.map((building) => ({
                    buildingName: building.buildingName,
                    [building.buildingName]: building.quantity,
                }));
                setTotalData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTotalData();
    }, []); // Empty dependency array to fetch data only once on component mount

    // console.log(getTotalData);

    // const halfLength = Math.ceil(getTotalData.length / 2);
    // const firstHalf = getTotalData.map((item) => item.itemName).slice(0, halfLength);
    // const secondHalf = getTotalData.map((item) => item.itemName).slice(halfLength);

    return (
        <ResponsiveBar
            height={300}
            data={getTotalData}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
            }}
            keys={getTotalData.map((building) => building.buildingName)}
            indexBy="buildingName"
            layout="horizontal"
            margin={{ top: 50, right: 60, bottom: 50, left: 150 }}
            padding={0.2}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "set3" }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            enableGridX={true}
            enableGridY={false}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : undefined, // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "quantity" : "quantity", // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : undefined, // changed
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            role="application"
            isInteractive={false}
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
            }}
        />
    );
};

export default BarChart;