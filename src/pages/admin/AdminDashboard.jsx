import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    Users,
    DollarSign,
    Clock,
    ArrowRight,
    ClipboardList
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        inventoryValue: 0,
        totalProducts: 0,
        lowStockAlerts: 0,
        totalCustomers: 0,
        stockValue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, ordersRes, analyticsRes] = await Promise.all([
                    adminAPI.getStats(),
                    adminAPI.getOrders(),
                    adminAPI.getAnalytics()
                ]);

                if (statsRes.data?.success) setStats(statsRes.data.data);
                if (ordersRes.data?.success) setRecentOrders(ordersRes.data.data?.slice(0, 5) || []);
                if (analyticsRes.data?.success) setTopProducts(analyticsRes.data.data?.topProducts || []);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                // Fallback mock data if API fails to show design
                setStats(s => ({ ...s, inventoryValue: 125430, totalOrders: 842, totalCustomers: 1240, stockValue: 84500 }));
                setRecentOrders([
                    { _id: 'ORD001', user: { name: 'Ali Ahmed' }, status: 'delivered', total: 185.00 },
                    { _id: 'ORD002', user: { name: 'Sarah J.' }, status: 'processing', total: 45.00 },
                    { _id: 'ORD003', user: { name: 'Ahmed Hassan' }, status: 'pending', total: 120.00 },
                ]);
            }
            setLoading(false);
        };
        fetchDashboardData();
    }, []);

    const cards = [
        { label: 'Total Revenue', value: `$${stats.inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50/50', trend: '+12.5%', isUp: true },
        { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50/50', trend: '+5.2%', isUp: true },
        { label: 'Total Customers', value: stats.totalCustomers.toLocaleString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-50/50', trend: '+8.1%', isUp: true },
        { label: 'Inventory Value', value: `$${(stats.stockValue || stats.inventoryValue).toLocaleString(undefined, { minimumFractionDigits: 0 })}`, icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50/50', trend: 'Healthy', isUp: true },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-gray-900 leading-tight">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Welcome back. Here's what's happening with Macaalinka today.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center shrink-0`}>
                                <card.icon className={`w-5 h-5 ${card.color}`} />
                            </div>
                            <span className={`text-[10px] font-black flex items-center gap-1 uppercase ${card.isUp ? 'text-green-500' : 'text-amber-500'}`}>
                                {card.trend} {card.isUp ? <TrendingUp className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            </span>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{card.label}</p>
                            <h2 className="text-xl lg:text-2xl font-black text-gray-900 mt-1">{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden flex flex-col">

                    <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-50">
                        <h3 className="font-black uppercase text-[12px] text-gray-900 tracking-wider">Recent Orders</h3>
                        <Link to="/admin/orders" className="text-[#FF0000] text-[10px] font-black uppercase flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto flex-grow">
                        <table className="w-full text-left">
                            <thead className="bg-white text-[9px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50">
                                <tr>
                                    <th className="px-8 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading orders...</td></tr>
                                ) : recentOrders.length === 0 ? (
                                    <tr><td colSpan="4" className="p-8 text-center text-gray-400 text-xs">No orders yet.</td></tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-4 text-xs font-black text-gray-900">#{order._id.slice(-6).toUpperCase()}</td>
                                            <td className="px-6 py-4 text-[11px] font-bold text-gray-600">{order.user?.name || 'Guest'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase ${order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                                                    order.status === 'processing' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right text-xs font-black text-gray-900">${order.total.toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Products / Top Sellers */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden flex flex-col">
                    <div className="px-8 py-6 bg-white border-b border-gray-50">
                        <h3 className="font-black uppercase text-[12px] text-gray-900 tracking-wider">Top Sellers</h3>
                    </div>
                    <div className="p-6 space-y-6 flex-grow">
                        {topProducts.length === 0 ? (
                            <div className="space-y-4">
                                {/* Sample Top Seller for Design consistency if empty */}
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg shrink-0 overflow-hidden p-1 border border-gray-100">
                                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" className="w-full h-full object-contain" alt="Home Jersey" />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <h4 className="text-[11px] font-black text-gray-900 truncate uppercase">Home Jersey 24/25</h4>
                                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">124 sold</p>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">$11,036</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg shrink-0 overflow-hidden p-1 border border-gray-100">
                                        <img src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b" className="w-full h-full object-contain" alt="Shorts" />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <h4 className="text-[11px] font-black text-gray-900 truncate uppercase">Training Shorts</h4>
                                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">86 sold</p>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">$3,010</span>
                                </div>
                            </div>
                        ) : (
                            topProducts.map((product, idx) => (
                                <div key={idx} className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-lg shrink-0 overflow-hidden p-1 border border-gray-100">
                                        <img src={product.image || 'https://via.placeholder.com/150'} className="w-full h-full object-contain" alt={product.name} />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <h4 className="text-[11px] font-black text-gray-900 truncate uppercase">{product.name}</h4>
                                        <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">{product.sold} sold</p>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">${product.revenue.toFixed(0)}</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                        <Link to="/admin/inventory">
                            <button className="w-full h-11 bg-[#F8F9FA] rounded-xl text-[10px] font-black uppercase text-gray-600 hover:bg-gray-100 transition-colors">Manage Inventory</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
