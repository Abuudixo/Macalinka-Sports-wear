import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Route guard that prevents admin users from accessing customer pages.
 * Redirects admin users to the admin dashboard.
 */
const CustomerRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-dark-900">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If user is an admin, redirect to admin dashboard
    if (user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default CustomerRoute;
