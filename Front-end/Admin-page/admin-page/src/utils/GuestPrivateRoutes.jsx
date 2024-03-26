// export default PrivateRoutes;
import { Outlet, Navigate } from 'react-router-dom';

const GuestPrivateRoutes = ({ children, ...rest }) => {
    const role = localStorage.getItem('role');

    // Kiểm tra nếu role không tồn tại hoặc không hợp lệ (ví dụ: null hoặc undefined), redirect đến trang login
    if (role == "ADMIN" || role == "MANAGER") {
        // handle logout
        localStorage.removeItem('mail');
        localStorage.removeItem('role');
        localStorage.removeItem('tokenTime'); 
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:8080/api/v1/auth/logout';
        
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default GuestPrivateRoutes;
