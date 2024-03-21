import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { Formik } from "formik";
import Header from "../../components/Header";
import * as yup from "yup";
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const validationSchema = yup.object().shape({
  blogName: yup.string().required("Blog name is required"),
  blogContent: yup.string().required("Blog content is required"),
  imgPath: yup.string(),
  blogType: yup.number(),
});

const AddBlog = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false); 
  const [userEmail, setUserEmail] = useState(localStorage.getItem("mail") || "");
  
  useEffect(() => {
    // Lấy giá trị của user từ localStorage
    const user = localStorage.getItem("mail");
    
    // Kiểm tra xem giá trị của user có tồn tại không và in ra console
    if(user) {
      console.log("User found:", user);
    } else {
      console.log("User not found in localStorage");
    }
  
    // Cập nhật giá trị của userEmail mỗi khi localStorage thay đổi
    setUserEmail(user || "");
  }, [localStorage.getItem("mail")]);
  
  const initialValues = {
    blogName: "",
    blogContent: "",
    blogType: 0,
    userEmail: userEmail,
    imgPath: ""
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        'http://localhost:8080/blog/create',
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response);
      console.log(values);
      setSubmitting(false);
      setSubmitSuccess(true); // Cập nhật state để hiển thị thông báo thành công
    } catch (error) {
      console.error('Error creating blog:', error);
      setSubmitError("Error creating blog");
      setSubmitting(false);
    }
  };
  

  const secondDropdownItems = [
    { value: 1, label: "Cẩm Nang Xây Dựng" },
    { value: 2, label: "Thiết Kế Kiến Trúc" },
  ];

  const handleImage = async (e, setFieldValue) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setFieldValue("imgPath", dataURL); // Gán chuỗi base64 vào imgPath
    };

    // Đảm bảo rằng file được chọn tồn tại
    if (file) {
      // Đọc file và chuyển đổi nó thành base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
       <Header title="Add Blog" subtitle="Create a New BLog" />
        {/* Phần xử lý hiển thị thông báo thành công */}
      {submitSuccess && (
        <Alert severity="success" onClose={() => setSubmitSuccess(false)}>
          Blog created successfully!
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <Typography variant="h6">Blog Name</Typography>
              <TextField
                fullWidth
                id="blogName"
                name="blogName"
                value={values.blogName}
                onChange={handleChange}
                error={touched.blogName && Boolean(errors.blogName)}
                helperText={touched.blogName && errors.blogName}
              />
            </Box>
            <Box>
              <Typography variant="h6">Image Of Blog</Typography>
              <input type='file' onChange={(e) => handleImage(e, setFieldValue)} /><br/>
            </Box>
            <Box mb={2}>
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
                onEditorChange={(content) => setFieldValue('blogContent', content)}
                initialValue={values.blogContent}
              />
              {touched.blogContent && errors.blogContent && (
                <Typography color="error">{errors.blogContent}</Typography>
              )}
            </Box>
            <Box mb={2}>
              <Typography variant="h6">Blog Type</Typography>
              <Select
                fullWidth
                id="blogType"
                name="blogType"
                value={values.blogType}
                onChange={handleChange}
                error={touched.blogType && Boolean(errors.blogType)}
                helperText={touched.blogType && errors.blogType}
              >
                {secondDropdownItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Submitting..." : "Create Blog"}
            </Button>
          </form>
        )}
      </Formik>
      {submitError && (
        <Alert severity="error" onClose={() => setSubmitError(null)}>
          {submitError}
        </Alert>
      )}
    </Box>
  );
};


export default AddBlog;
