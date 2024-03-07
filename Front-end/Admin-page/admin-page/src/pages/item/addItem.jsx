import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    itemId: 0,
    itemName: "",
    priceItem: "",
    status: 1,
};

const userSchema = yup.object().shape({
    priceItem: yup.string().required("Item Name is required"),
    priceItem: yup.string().required("Unit Price is required"),
});

const AddItem = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [getItemTypeId, setItemTypeID] = useState("");
    
    const formik = useFormik({
        initialValues: {
            itemId: 0,
            itemName: "",
            priceItem: "",
            status: 1,
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/building/item/create?itemTypeId=${getItemTypeId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                    credentials: 'include', // Include credentials for cross-origin requests
                });
                

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                } else {
                    console.log('Add successful:', values);
                }
    
                // Handle successful (e.g., navigate to a different page, store user data)
                window.alert('Item added successfully');
                navigate('/item');
            } catch (error) {
                console.error('Error during submit:', error);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown menu
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open dropdown on click
      };
    const handleClose = () => {
    setAnchorEl(null); // Close dropdown on selection or outside click
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
    const handleChanges = (event) => {
        setItemTypeID(event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="20px">
            <Header title="Add Item" subtitle="Create a New Item" />
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
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom>Item Type</Typography>
                                <Select
                                    labelId="material-type-label"
                                    id="material-type"
                                    defaultValue="" 
                                    onChange={handleChanges}
                                    error={!!touched.itemType && !!errors.itemType} // Add error logic
                                    open={Boolean(anchorEl)} // Open dropdown based on state
                                    onClose={handleClose} // Close dropdown on selection or outside click
                                    onOpen={handleOpen} // Open dropdown on click
                                    fullWidth={true}
                                >
                                    {/* get menu item name from api above */}
                                    {getItemTypes.map((itemType) => (
                                        <MenuItem key={itemType.itemTypeId} value={itemType.itemTypeId}>
                                            {itemType.itemTypeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="item Name"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.itemName}
                            name="itemName"
                            error={!!touched.itemName && !!errors.itemName}
                            helperText={touched.itemName && errors.itemName}
                            sx={{ gridColumn: "span 2" }}
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
                            sx={{ gridColumn: "span 2"}}
                            />
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/item")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Item
                            </Button>
                        </Box>
                        
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default AddItem;