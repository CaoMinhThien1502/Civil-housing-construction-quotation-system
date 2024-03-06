import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    materialID: 0,
    materialName: "",
    unitPrice: "",
    status: 1,
};

const userSchema = yup.object().shape({
    materialName: yup.string().required("Material Name is required"),
    unitPrice: yup.string().required("Unit Price is required"),
});

const AddMaterial = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [materialTypeId, setMaterialTypeId] = useState("");
    
    const formik = useFormik({
        initialValues: {
            materialID: 0,
            materialName: "",
            unitPrice: "",
            status: 1,
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch(`http://localhost:8080/combobuilding/material/create?materialTypeId=${materialTypeId}`, {
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
                window.alert('Material added successfully');
                navigate('/materialList');
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
    const handleChanges = (event) => {
        setMaterialTypeId(event.target.value);
        console.log(event.target.value);
    }

    return (
        <Box m="20px">
            <Header title="Add Material" subtitle="Create a New Material" />
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
                                <Typography variant="h6" gutterBottom>Material Type</Typography>
                                <Select
                                    labelId="material-type-label"
                                    id="material-type"
                                    defaultValue="" 
                                    onChange={handleChanges}
                                    error={!!touched.materialType && !!errors.materialType} // Add error logic
                                    open={Boolean(anchorEl)} // Open dropdown based on state
                                    onClose={handleClose} // Close dropdown on selection or outside click
                                    onOpen={handleOpen} // Open dropdown on click
                                    fullWidth={true}
                                >
                                    {/* get menu item name from api above */}
                                    {materialTypes.map((materialType) => (
                                        <MenuItem key={materialType.materialTypeId} value={materialType.materialTypeId}>
                                            {materialType.typeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Material Name"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.materialName}
                            name="materialName"
                            error={!!touched.materialName && !!errors.materialName}
                            helperText={touched.materialName && errors.materialName}
                            sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Unit Price"
                            onBlur={handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.unitPrice}
                            name="unitPrice"
                            error={!!touched.unitPrice && !!errors.unitPrice}
                            helperText={touched.unitPrice && errors.unitPrice}
                            sx={{ gridColumn: "span 2"}}
                            />
                            <Typography sx={{ gridColumn: "span 4"}} variant="h6" gutterBottom>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/materialList")} color="secondary" variant="contained">
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

export default AddMaterial;