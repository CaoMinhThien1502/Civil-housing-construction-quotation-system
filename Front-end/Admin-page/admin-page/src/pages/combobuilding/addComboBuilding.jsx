import { Box, Button, Checkbox, FormControlLabel, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field, Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const initialValues = {
    comboBuildingName: "",
    type: "",
    materialIdList: [],
    status: 1,
};

const userSchema = yup.object().shape({
    comboBuildingName: yup.string().required("Combo Building Name is required"),
    materialIdList: yup.array().required("Material List is required"),
});

const AddComboBuilding = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/comboBuilding');
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
            comboBuildingName: "",
            type: "",
            materialIdList: [],
            status: 1,
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/combo/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...values,
                        materialIdList: values.materialIdList, // Explicitly include materialIdList
                    }),
                    credentials: 'include', // Include credentials for cross-origin requests
                });
                
                console.log('Add successful:', values);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                } else {
                    console.log('Add successful:', values);
                }
    
                // Handle successful (e.g., navigate to a different page, store user data)
                setOpenSuccess(true);
                // navigate('/comboBuilding');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    const [secondDropdownItems] = useState([
        { value: "0", label: "Xây nhà phần thô" },
        { value: "1", label: "Xây nhà hoàn thiện" },
        { value: "2", label: "Xây dựng trọn gói" },
    ]);
    const [secondAnchorEl, setSecondAnchorEl] = useState(null);
    const handleSecondOpen = (event) => {
        setSecondAnchorEl(event.currentTarget);
    };
    const handleSecondClose = () => {
        setSecondAnchorEl(null);
    };
    const handleChanges = (event) => {
        formik.setFieldValue("type", event.target.value);
        console.log(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown menu
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget); // Open dropdown on click
      };
    const handleClose = () => {
    setAnchorEl(null); // Close dropdown on selection or outside click
    };
    const handleChanges1 = (event) => {
        setMaterialTypeId(event.target.value);
        
        console.log(event.target.value);
    }

    const [materialTypeId, setMaterialTypeId] = useState("");
    const [materialTypes, setMaterialTypes] = useState([]);
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

    const [materialOptions, setMaterialOptions] = useState([]);
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material/getByMaterialType?materialTypeId=${materialTypeId}`, {
                    method: 'GET',
                    headers: {
                        // 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('data', data);
                setMaterialOptions(data);
            } catch (error) {
                console.error('Error fetching material types:', error);
            }
        };

        if (materialTypeId) {
            fetchMaterials();
        }
    }, [materialTypeId]); // Empty dependency array to fetch data only once on component mount
    
    return (
        <Box m="20px">
            <Header title="Add Combo Building" subtitle="Create a New Combo Building" />
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
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // if the screen is non-mobile, then the grid column will be span 4
                            }}
                        >
                            
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom>Material Type</Typography>
                                <Select
                                    labelId="material-type-label"
                                    id="material-type"
                                    defaultValue=""
                                    onChange={handleChanges1}
                                    error={!!touched.materialType && !!errors.materialType} // Add error logic
                                    open={Boolean(anchorEl)} // Open dropdown based on state
                                    onClose={handleClose} // Close dropdown on selection or outside click
                                    onOpen={handleOpen} // Open dropdown on click
                                    fullWidth={true}
                                >
                                    {/* get menu item name from api above */}
                                    {materialTypes.filter((materialType) => materialType.status === true).map((materialType) => (
                                        <MenuItem key={materialType.materialTypeId} value={materialType.materialTypeId}>
                                            {materialType.typeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom>Material Included</Typography>

                                <div>
                                    {materialOptions.filter((option) => option.status === true).map((option) => (
                                        <div key={option.materialId}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        value={option.materialId}
                                                        color="secondary"
                                                        checked={formik.values.materialIdList.includes(option.materialId)} // Check if materialId is already selected
                                                        onChange={(event) => {
                                                            const updatedMaterialIdList = [...formik.values.materialIdList]; // Create a copy of the existing list
                                                            if (event.target.checked) {
                                                                updatedMaterialIdList.push(option.materialId); // Add ID if checked
                                                            } else {
                                                                updatedMaterialIdList.splice(updatedMaterialIdList.indexOf(option.materialId), 1); // Remove ID if unchecked
                                                            }
                                                            formik.setFieldValue('materialIdList', updatedMaterialIdList); // Update formik state
                                                        }}
                                                    />
                                                }
                                                label={option.materialName}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Box>
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Combo Building Name"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.comboBuildingName}
                            name="comboBuildingName"
                            error={!!touched.comboBuildingName && !!errors.comboBuildingName}
                            helperText={touched.comboBuildingName && errors.comboBuildingName}
                            sx={{ gridColumn: "span 4"}}
                            />
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6" gutterBottom>Combo Building Type</Typography>
                                <Select
                                    labelId="combo-building-type-label"
                                    id="combo-building-type"
                                    defaultValue=""
                                    onChange={handleChanges}
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
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/comboBuilding")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Combo Building
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
                    Combo Building added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Combo Building added error!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AddComboBuilding;