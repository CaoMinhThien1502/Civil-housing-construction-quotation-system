import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    itemId: 0,
    itemName: "",
    priceItem: "",
    status: "",
};

const userSchema = yup.object().shape({
    itemName: yup.string().required("Item Name is required"),
    priceItem: yup.number().required("Unit Price is required"),
}); 


const EditItem = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const {id} = useParams();
    const [getItemTypeId, setItemTypeID] = useState("");

    const [getItem, setItem] = useState({});
    useEffect(() => {
        const fetchItemById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/building/item/id?itemid=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchItemById();
    }, []); // Empty dependency array to fetch data only once on component mount

    const formik = useFormik({
        initialValues: {
            itemId: 0,
            itemName: `${getItem.itemName}`,
            priceItem: `${getItem.priceItem}`,
            status: `${getItem.status}`,
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/building/item/update?itemId=${id}&itemTypeId=${getItemTypeId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                    credentials: 'include', // Include credentials for cross-origin requests
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                } else {
                    console.log('Edit successful:', values);
                }
    
                // Handle successful (e.g., navigate to a different page, store user data)
                window.alert("Item updated successfully!");
                navigate('/itemList');
            } catch (error) {
                console.error('Error during submit:', error);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    // event of select item type
    const [anchorElItemType, setAnchorElItemType] = useState(null); // State to manage dropdown menu
    const handleOpenItemType = (event) => {
        setAnchorElItemType(event.currentTarget); // Open dropdown on click
    };
    const handleCloseItemType = () => {
        setAnchorElItemType(null); // Close dropdown on selection or outside click
    };

    const [getItemTypes, setItemTypes] = useState([]);
    useEffect(() => {
        const fetchItemTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/building/item-type/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setItemTypes(data);
            } catch (error) {
                console.error('Error fetching material types:', error);
            }
        };

        fetchItemTypes(); 
    }, []); // Empty dependency array to fetch data only once on component mount

    const handleChangesItemType = (event) => {
        setItemTypeID(event.target.value);
        console.log(event.target.value);
    }
    // Event of status
    const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown menu
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open dropdown on click
    };
    const handleClose = () => {
        setAnchorEl(null); // Close dropdown on selection or outside click
    };

    const handleChanges = (event) => {
        formik.setFieldValue("status", event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="20px">
            <Header title="Edit Item" subtitle="Edit an Existing Item" />
            <Formik
            onSubmit={formik.handleSubmit}
            initialValues={initialValues}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))" // split the grid into 4 columns, each can have a minimum width of 0 and a maximum width of 1fr
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}, // if the screen is non-mobile, then the grid column will be span 4
                        }}
                        >
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Item Name"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.itemName}
                            name="itemName"
                            error={!!touched.itemName && !!errors.itemName}
                            helperText={touched.itemName && errors.itemName}
                            sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Unit Price"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.priceItem}
                            name="priceItem"
                            error={!!touched.priceItem && !!errors.priceItem}
                            helperText={touched.priceItem && errors.priceItem}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom sx={{ gridColumn: "span 4"}}>
                                    Item Type:
                                </Typography>
                                <Select
                                    labelId="item-type-label"
                                    id="item-type"
                                    defaultValue="" 
                                    onChange={handleChangesItemType}
                                    error={!!touched.itemType && !!errors.itemType} // Add error logic
                                    open={Boolean(anchorElItemType)} // Open dropdown based on state
                                    onClose={handleCloseItemType} // Close dropdown on selection or outside click
                                    onOpen={handleOpenItemType} // Open dropdown on click
                                    fullWidth={true}
                                >
                                    {/* get menu item name from api above */}
                                    {getItemTypes.filter((itemType) => itemType.status === true).map((itemType) => (
                                        <MenuItem key={itemType.itemTypeId} value={itemType.itemTypeId}>
                                            {itemType.itemTypeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            
                            <Typography sx={{ gridColumn: "span 4" }} variant="h6" gutterBottom>
                                Previous Status: {formik.initialValues.status === "true" ? "Active" : "Inactive"}
                            </Typography>
                        </Box>
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Select
                                labelId="item-status-label"
                                id="item-status"
                                defaultValue="" 
                                onChange={handleChanges}
                                error={!!touched.itemId && !!errors.itemId} // Add error logic
                                open={Boolean(anchorEl)} // Open dropdown based on state
                                onClose={handleClose} // Close dropdown on selection or outside click
                                onOpen={handleOpen} // Open dropdown on click
                                fullWidth={true}
                            >
                                <MenuItem key={true} value={true}>
                                    Active
                                </MenuItem>
                                <MenuItem key={false} value={false}>
                                    Inactive
                                </MenuItem>
                            </Select>
                        </Box>
                        
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/itemList")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Item
                            </Button>
                        </Box>
                        
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default EditItem;