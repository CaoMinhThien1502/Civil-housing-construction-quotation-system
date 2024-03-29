import { Box, Button, Checkbox, FormControlLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialValues = {
    role: "",
};

const userSchema = yup.object().shape({
});

const EditUser = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/userList');
    };

    const [openError, setOpenError] = useState(false);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const {id} = useParams();
    const formik = useFormik({
        initialValues: {
            role: "",
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            if (values.role === "") {
                setOpenError(true);
                return;
            }
            try {
                const response = await fetch(`http://localhost:8080/user/update-role?userId=${id}&role=${values.role}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify({
                    //     ...values,
                    // }),
                    credentials: 'include', // Include credentials for cross-origin requests
                });
                
                console.log('Edit successful:', values);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                } else {
                    console.log('Edit successful:', values);
                    
                }
    
                // Handle successful (e.g., navigate to a different page, store user data)
                // window.alert('User Role edited successfully');
                setOpenSuccess(true);
                // navigate('/userList');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    const secondDropdownItems = [
        { value: "CUSTOMER", label: "CUSTOMER" },
        { value: "MANAGER", label: "MANAGER" },
        { value: "ADMIN", label: "ADMIN" },
    ];
    const [secondAnchorEl, setSecondAnchorEl] = useState(null);
    const handleSecondOpen = (event) => {
        setSecondAnchorEl(event.currentTarget);
    };
    const handleSecondClose = () => {
        setSecondAnchorEl(null);
    };
    const handleSecondChanges = (event) => {
        formik.setFieldValue("role", event.target.value);
        console.log(event.target.value);
    };

    return (
        <Box m="20px">
            <Header title="Edit User Role" subtitle="Edit a User's Role" />
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
                            <Typography variant="h6" gutterBottom sx={{ gridColumn: "span 4"}}>
                                User Role:
                                {/* Previous Role: {formik.initialValues.role === "CUSTOMER" ? "CUSTOMER" : formik.initialValues.type === "MANAGER" ? "MANAGER" : "ADMIN"} */}
                            </Typography>
                        </Box>
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Select
                                labelId="user-role-label"
                                id="user-role"
                                defaultValue=""
                                onChange={handleSecondChanges}
                                error={!!touched.type && !!errors.type}
                                open={Boolean(secondAnchorEl)}
                                onClose={handleSecondClose}
                                onOpen={handleSecondOpen}
                                fullWidth={true}
                            >
                                {secondDropdownItems.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/userList")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Edit User Role
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
                    User Role edited successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    User Role edited error!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default EditUser;