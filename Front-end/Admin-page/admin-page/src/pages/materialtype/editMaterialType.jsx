import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
    materialTypeID: 0,
    typeName: "",
    status: "",
};

const userSchema = yup.object().shape({
    typeName: yup.string().required("Material Type Name is required"),
});

const EditMaterialType = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const {id} = useParams();

    const [getMaterialType, setMaterialType] = useState({});
    useEffect(() => {
        const fetchMaterialTypeById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material-type/getbyid?materialTypeId=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterialType(data);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterialTypeById();
    }, []); // Empty dependency array to fetch data only once on component mount

    const formik = useFormik({
        initialValues: {
            materialTypeID: 0,
            typeName: `${getMaterialType.typeName}`,
            status: `${getMaterialType.status}`,
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material-type/update?materialTypeId=${id}`, {
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
                window.alert('Material Type updated successfully');
                navigate('/materialType');
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

    const handleChanges = (event) => {
        formik.setFieldValue("status", event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="20px">
            <Header title="Edit Material Type" subtitle="Edit an Existing Material Type" />
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
                            sx={{ gridColumn: "span 4" }}
                            />
                            <Typography sx={{ gridColumn: "span 4" }} variant="h6" gutterBottom>
                                Previous Status: {formik.initialValues.status === "true" ? "Active" : "Inactive"}
                            </Typography>
                        </Box>
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Select
                                labelId="material-type-status-label"
                                id="material-type-status"
                                defaultValue="" 
                                onChange={handleChanges}
                                error={!!touched.materialTypeID && !!errors.materialTypeID} // Add error logic
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
                            <Button onClick={() => navigate("/materialType")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Material Type
                            </Button>
                        </Box>
                        
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default EditMaterialType;