import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Footer } from '../home/home.js';
import { Paper } from '@mui/material';

const BlogDetail = () => {
    const { id } = useParams(); 
    const [getBlog, setBlog] = useState(null); 

    useEffect(() => {
        axios.get(`http://localhost:8080/blog/getById?id=${id}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog:', error);
            });
    }, [id]);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}> {/* Container div for styling */}
            <Header />
            <div style={{ marginTop: '120px', flex: 1, paddingLeft: '100px', paddingRight: '100px' }}> {/* Add paddingLeft and paddingRight */}
                {getBlog && (
                    <Paper elevation={12} style={{ padding: '50px' }} dangerouslySetInnerHTML={{ __html: getBlog.blogContent }} />
                )}
                            <div style={{marginTop: '30px',marginBottom: '30px'}}>
                    <Link to="http://localhost:3000/home" style={{ backgroundColor: 'blue', padding: '10px 20px', color: 'white', textDecoration: 'none', borderRadius: '5px'}}>Back</Link> {/* Styled link to go back */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogDetail;
