import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutGrid,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Search,
    ChevronDown,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/admin' },
        { id: 'inventory', label: 'Product Inventory', icon: Package, path: '/admin/inventory' },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
        { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
        { id: 'analytics', label: 'Sales Analytics', icon: BarChart3, path: '/admin/analytics' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden relative">
            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="hidden lg:flex w-64 bg-[#0F172A] text-white flex-col shrink-0">
                <SidebarContent navItems={navItems} location={location} handleLogout={handleLogout} />
            </aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isMobileSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-72 bg-[#0F172A] text-white flex flex-col z-[70] lg:hidden"
                        >
                            <SidebarContent
                                navItems={navItems}
                                location={location}
                                handleLogout={handleLogout}
                                onClose={() => setIsMobileSidebarOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-grow flex flex-col overflow-hidden w-full">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:flex items-center gap-2 text-[12px] font-medium">
                            <span className="text-gray-400">Admin</span>
                            <span className="text-gray-300 mx-1">&gt;</span>
                            <span className="text-gray-900 font-bold capitalize">
                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                            </span>
                        </div>
                        {/* Smallest screen fallback icon if crumb is hidden */}
                        <div className="sm:hidden font-black text-gray-900 uppercase tracking-tighter text-[14px]">
                            {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-4">

                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center"
                            >
                                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-[#C4B28B] rounded-full flex items-center justify-center p-0.5 border-2 border-[#C4B28B]/20">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=C4B28B&color=fff`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 uppercase font-bold tracking-wider">My Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 uppercase font-bold tracking-wider">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow overflow-y-auto p-4 lg:p-8 bg-[#F8F9FA] custom-scrollbar">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

// Sub-component for Sidebar Content to avoid duplication
const SidebarContent = ({ navItems, location, handleLogout, onClose }) => (
    <>
        <div className="p-8 pb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#DC2626] rounded-lg flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-red-600/20">
                    M
                </div>
                <div>
                    <h1 className="font-black text-[13px] uppercase tracking-tighter leading-none">Macaalinka</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Sportswear Admin</p>
                </div>
            </div>
            {onClose && (
                <button onClick={onClose} className="p-2 lg:hidden text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>
            )}
        </div>

        <nav className="flex-grow px-4 space-y-1">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/admin' && (location.pathname === '/admin' || location.pathname === '/admin/'));
                return (
                    <Link
                        key={item.id}
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${isActive
                            ? 'bg-[#DC2626] text-white shadow-lg shadow-red-600/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1 mt-auto">
            <Link
                to="/admin/settings"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
                <Settings className="w-5 h-5" />
                Settings
            </Link>
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </div>
    </>
);

export default AdminLayout;
