import { Box, Button, Menu, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Editor } from '@tinymce/tinymce-react';

const initialValues = {
    blogName: "",
    blogContent: "",
    blogType: 0,
    userEmail: "",
    imgPath: ""
};

const userSchema = yup.object().shape({
    blogName: yup.string().required("Blog name is required"),
    blogContent: yup.string().required("Blog content is required"),
});

const AddBlog = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState(localStorage.getItem("mail") || "");

    useEffect(() => {
        // Lấy giá trị của user từ localStorage
        const user = localStorage.getItem("mail");

        // Kiểm tra xem giá trị của user có tồn tại không và in ra console
        if (user) {
            console.log("User found:", user);
        } else {
            console.log("User not found in localStorage");
        }

        // Cập nhật giá trị của userEmail mỗi khi localStorage thay đổi
        setUserEmail(user || "");
    }, [localStorage.getItem("mail")]);

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        navigate('/blogList');
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
            blogName: "",
            blogContent: "",
            blogType: 0,
            userEmail: userEmail,
            imgPath: ""
        },

        onSubmit: async (values) => {
            console.log("Values in onSubmit:", values);
            try {
                const response = await fetch('http://localhost:8080/blog/create', {
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
                // navigate('/blogList');
            } catch (error) {
                console.error('Error during submit:', error);
                setOpenError(true);
                // Handle submit errors (e.g., display an error message to the user)
            }
        },

        validationSchema: userSchema,
    });

    const secondDropdownItems = [
        { value: 1, label: "Cẩm Nang Xây Dựng" },
        { value: 2, label: "Thiết Kế Kiến Trúc" },
    ];
    const [secondAnchorEl, setSecondAnchorEl] = useState(null);
    const handleSecondOpen = (event) => {
        setSecondAnchorEl(event.currentTarget);
    };
    const handleSecondClose = () => {
        setSecondAnchorEl(null);
    };
    const handleChanges = (event) => {
        formik.setFieldValue("blogType", event.target.value);
        console.log(event.target.value);
    };

    const [getImgName, setImgName] = useState("");
    const handleImage = async (e, setFieldValue) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const dataURL = reader.result;
            formik.setFieldValue("imgPath", dataURL); // Gán chuỗi base64 vào imgPath
        };

        // Đảm bảo rằng file được chọn tồn tại
        if (file) {
            // Đọc file và chuyển đổi nó thành base64
            reader.readAsDataURL(file);
            setImgName(file.name);
        }
    };
    return (
        <Box m="20px">
            <Header title="Add Blog" subtitle="Create a New Blog" />
            <Formik
            onSubmit={formik.handleSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                            label="Blog Name"
                            onBlur={handleBlur}
                            onChange={(event) => {
                                handleChange(event); // handleChange for validation userSchema
                                formik.handleChange(event); // handleChange for formik
                            }}
                            value={formik.values.blogName}
                            name="blogName"
                            error={!!touched.blogName && !!errors.blogName}
                            helperText={touched.blogName && errors.blogName}
                            sx={{ gridColumn: "span 4" }}
                            />
                            <Box sx={{ gridColumn: "span 2" }}>
                                <Typography variant="h6" gutterBottom>Blog Type</Typography>
                                <Select
                                    labelId="blog-type-label"
                                    id="blog-type"
                                    defaultValue=""
                                    onChange={handleChanges}
                                    error={!!touched.blogType && !!errors.blogType}
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
                            <Box sx={{ gridColumn: "span 2" }}>
                                <Typography variant="h6">Image Of Blog</Typography>
                                <Button color="secondary" variant="contained" component="label" htmlFor="image-upload">
                                    Upload Image
                                    <input type="file" onChange={(e) => handleImage(e, setFieldValue)} style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        opacity: 0, // Hide the default button styles
                                    }} />
                                </Button>
                                <Typography variant="h6" gutterBottom>{getImgName}</Typography>
                            </Box>
                            <Box sx={{ gridColumn: "span 4" }}>
                                <Typography variant="h6">Blog Content</Typography>
                                <Editor
                                    apiKey='zp8jfn1nvy1u7pkp5druwoia765cwoo5x499tdjzjifljhl0'
                                    init={{
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        tinycomments_mode: 'embedded',
                                        tinycomments_author: 'Author name',
                                        mergetags_list: [
                                            { value: 'First.Name', title: 'First Name' },
                                            { value: 'Email', title: 'Email' },
                                        ],
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                    }}
                                    onEditorChange={(content) => {
                                        setFieldValue("blogContent", content); // Gán giá trị content vào blogContent
                                        formik.setFieldValue("blogContent", content); // Gán giá trị content vào blogContent
                                    }}
                                />
                                {touched.blogContent && errors.blogContent && (
                                    <Typography color="error">{errors.blogContent}</Typography>
                                )}
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button onClick={() => navigate("/blogList")} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Box ml="10px"/>
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Blog
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
                    Blog added successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} >
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    // variant="outlined"
                    sx={{ fontSize: 15 }}
                >
                    Blog added error!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AddBlog;