import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialValues = {
    materialID: 0,
    materialName: "",
    unitPrice: "",
    status: "",
    unit: "",
    materialTypeId: "",
};

const userSchema = yup.object().shape({
    materialName: yup.string().required("Material Name is required"),
    unitPrice: yup.number().required("Unit Price is required"),
    unit: yup.string().required("Unit is required"),
}); 

const EditMaterial = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const {id} = useParams();

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/materialList');
    };

    const [openError, setOpenError] = useState(false);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const [getMaterial, setMaterial] = useState({});
    useEffect(() => {
        const fetchMaterialById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material/getbyid?materialId=${id}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterial(data);
                console.log(getMaterial);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterialById();
    }, []); // Empty dependency array to fetch data only once on component mount

    const formik = useFormik({
        initialValues: {
            materialID: 0,
            materialName: `${getMaterial.materialName}`,
            unitPrice: `${getMaterial.unitPrice}`,
            status: `${getMaterial.status}`,
            unit: `${getMaterial.unit}`,
            materialTypeId: `${getMaterial.materialTypeId}`,
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material/update?materialId=${id}`, {
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
                setOpenSuccess(true);
                // navigate('/materialList');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    const [getMaterialTypes, setMaterialTypes] = useState([]);
    useEffect(() => {
        const fetchMaterialTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/combobuilding/material-type/get', {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setMaterialTypes(data);
            } catch (error) {
                console.error('Error fetching material types:', error);
            }
        };

        fetchMaterialTypes(); 
    }, []); // Empty dependency array to fetch data only once on component mount

    const [secondAnchorEl, setSecondAnchorEl] = useState(null);
    const handleSecondOpen = (event) => {
        setSecondAnchorEl(event.currentTarget);
    };
    const handleSecondClose = () => {
        setSecondAnchorEl(null);
    };
    const handleSecondChanges = (event) => {
        formik.setFieldValue("materialTypeId", event.target.value);
        console.log(event.target.value);
    };

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
            <Header title="Edit Material" subtitle="Edit an Existing Material" />
            <Formik
            onSubmit={formik.handleSubmit}
            initialValues={initialValues}
            // validationSchema={userSchema}
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
                            label="Material Name"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.materialName}
                            name="materialName"
                            error={!!touched.materialName && !!errors.materialName}
                            helperText={touched.materialName && errors.materialName}
                            sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Unit Price"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.unitPrice}
                            name="unitPrice"
                            error={!!touched.unitPrice && !!errors.unitPrice}
                            helperText={touched.unitPrice && errors.unitPrice}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Unit"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.unit}
                            name="unit"
                            error={!!touched.unit && !!errors.unit}
                            helperText={touched.unit && errors.unit}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <Typography variant="h6" gutterBottom sx={{ gridColumn: "span 4" }}>
                                Previous Material Type: {getMaterial.materialTypeName}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ gridColumn: "span 4" }}>
                            <Select
                                labelId="material-type-label"
                                id="material-type"
                                defaultValue=""
                                onChange={handleSecondChanges}
                                error={!!touched.type && !!errors.type}
                                open={Boolean(secondAnchorEl)}
                                onClose={handleSecondClose}
                                onOpen={handleSecondOpen}
                                fullWidth={true}
                            >
                                {getMaterialTypes.filter((materialType) => materialType.status === true).map((materialType) => (
                                    <MenuItem key={materialType.materialTypeId} value={materialType.materialTypeId}>
                                        {materialType.typeName}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{ gridColumn: "span 4" }} variant="h6" gutterBottom>
                                Previous Status: {formik.initialValues.status === "true" ? "Active" : "Inactive"}
                            </Typography>
                        </Box>

                        <Box sx={{ gridColumn: "span 4" }}>
                            <Select
                                labelId="material-status-label"
                                id="material-status"
                                defaultValue="" 
                                onChange={handleChanges}
                                error={!!touched.materialID && !!errors.materialID} // Add error logic
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
                            <Button onClick={() => navigate("/materialList")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Edit Material
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
                    Material edited successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Material edited error!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default EditMaterial;