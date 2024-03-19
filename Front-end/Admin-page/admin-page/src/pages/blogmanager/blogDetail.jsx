import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            {getBlog && (
                <div dangerouslySetInnerHTML={{ __html: getBlog.blogContent }} />
            )}
        </div>
    );
};

export default BlogDetail;
