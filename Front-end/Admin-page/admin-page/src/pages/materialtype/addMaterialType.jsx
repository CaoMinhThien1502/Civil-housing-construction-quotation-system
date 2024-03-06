import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    materialTypeID: 0,
    typeName: "",
    status: 1,
};

const userSchema = yup.object().shape({
    typeName: yup.string().required("Material Type Name is required"),
});

const AddMaterialType = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            materialTypeID: 0,
            typeName: "",
            status: 1,
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material-type/create`, {
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
                window.alert('Material Type added successfully');
                navigate('/materialType');
            } catch (error) {
                console.error('Error during submit:', error);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });
    
    return (
        <Box m="20px">
            <Header title="Add Material Type" subtitle="Create a New Material Type" />
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
                            label="Material Type Name"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.typeName}
                            name="typeName"
                            error={!!touched.typeName && !!errors.typeName}
                            helperText={touched.typeName && errors.typeName}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/materialType")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Material
                            </Button>
                        </Box>
                        
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default AddMaterialType;