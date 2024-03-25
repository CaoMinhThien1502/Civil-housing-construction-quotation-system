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
    buildingId: 0,
    buildingName: "",
    percentPrice: "",
    status: 1,
    buildingTypeId: 0
};

const userSchema = yup.object().shape({
    buildingName: yup.string().required("Building Name is required"),
    percentPrice: yup.string().required("Percent Price is required"),
});

const AddBuilding = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/buildingList');
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
            buildingId: 0,
            buildingName: "",
            percentPrice: "",
            status: 1,
            buildingTypeId: 0
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/building/create`, {
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
                // navigate('/buildingList');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
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

    const [getBuildingTypes, setBuildingTypes] = useState([]);
    useEffect(() => {
        const fetchBuildingTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/building/type/list', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setBuildingTypes(data);
            } catch (error) {
                console.error('Error fetching material types:', error);
            }
        };

        fetchBuildingTypes();
    }, []); // Empty dependency array to fetch data only once on component mount
    const handleChanges = (event) => {
        formik.setFieldValue("buildingTypeId", event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="20px">
            <Header title="Add Building" subtitle="Create a New Building" />
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
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom>Building Type</Typography>
                                <Select
                                    labelId="building-type-label"
                                    id="building-type"
                                    defaultValue="" 
                                    onChange={handleChanges}
                                    error={!!touched.buildingType && !!errors.buildingType} // Add error logic
                                    open={Boolean(anchorEl)} // Open dropdown based on state
                                    onClose={handleClose} // Close dropdown on selection or outside click
                                    onOpen={handleOpen} // Open dropdown on click
                                    fullWidth={true}
                                >
                                    {/* get menu building type name from api above */}
                                    {getBuildingTypes.filter((buildingType) => buildingType.status === true).map((buildingType) => (
                                        <MenuItem key={buildingType.buildingTypeId} value={buildingType.buildingTypeId}>
                                            {buildingType.buildingTypeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Building Name"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.buildingName}
                            name="buildingName"
                            error={!!touched.buildingName && !!errors.buildingName}
                            helperText={touched.buildingName && errors.buildingName}
                            sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Percent Price"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.percentPrice}
                            name="percentPrice"
                            error={!!touched.percentPrice && !!errors.percentPrice}
                            helperText={touched.percentPrice && errors.percentPrice}
                            sx={{ gridColumn: "span 2"}}
                            />
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/buildingList")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Building
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
                    Building added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Building added error!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AddBuilding;