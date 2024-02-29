import { Box, Button, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    materialName: "",
    unitPrice: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    materialName: yup.string().required("Material Name is required"),
    unitPrice: yup.string().required("Unit Price is required"),
});

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return (
        <Box m="20px">
            <Header title="ADD MATERIAL" subtitle="Create a New Material" />
            <Formik
            onSubmit={handleFormSubmit}
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
                            label="Material Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.materialName}
                            name="materialName"
                            error={!!touched.materialName && !!errors.materialName}
                            helperText={touched.materialName && errors.materialName}
                            sx={{ gridColumn: "span 3"}}
                            />
                            <TextField
                            fullWidth
                            variant="filled"
                            type="number"
                            label="Unit Price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.unitPrice}
                            name="unitPrice"
                            error={!!touched.unitPrice && !!errors.unitPrice}
                            helperText={touched.unitPrice && errors.unitPrice}
                            sx={{ gridColumn: "span 3"}}
                            />
                            <Typography sx={{ gridColumn: "span 3"}}>
                                Status: Active  
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
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

export default Form;