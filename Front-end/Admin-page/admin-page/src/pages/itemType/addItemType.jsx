import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialValues = {
    itemTypeName: "",
    status: 1,
};

const userSchema = yup.object().shape({
    // itemTypeName: yup.string().required(() => { setOpenError(true) }),
    itemTypeName: yup.string().required("Item Type Name is required"),
});

const AddItemType = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/itemType');
    };

    const [openError, setOpenError] = useState(false);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const formik = useFormik({
        initialValues: {
            itemTypeName: "",
            status: 1,
        },

        validationSchema: userSchema,

        onSubmit: async (values) => {
            if (values.itemTypeName === "") {
                setOpenError(true);
                return;
            }
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/building/item-type/create`, {
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
                setOpenSuccess(true);
                // navigate('/itemType');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },
    });
    
    return (
        <Box m="20px">
            <Header title="Add Item Type" subtitle="Create a New Item Type" />
            <Formik
            onSubmit={formik.handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
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
                            label="Item Type Name"
                            onBlur={handleBlur}
                            // onChange={formik.handleChange}
                            onChange={(event) => {
                                handleChange(event);
                                formik.handleChange(event);
                            }}
                            value={formik.values.itemTypeName}
                            name="itemTypeName"
                            error={!!touched.itemTypeName && !!errors.itemTypeName}
                            helperText={touched.itemTypeName && errors.itemTypeName}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/itemType")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Item Type
                            </Button>
                        </Box>
                        
                    </form>
                )}
            </Formik>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Item Type added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Item Type added error!
                </Alert>
            </Snackbar>
        </Box>
    )
    
}

export default AddItemType;