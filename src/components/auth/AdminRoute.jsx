import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-dark-900">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
