import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
    Search,
    Filter,
    Eye,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    MoreHorizontal
} from 'lucide-react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getOrders();
            if (response.data?.success) {
                setOrders(response.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            // Mock data for visualization
            setOrders([
                {
                    _id: 'ORDD7F2A1',
                    user: { name: 'Ahmed Hassan', email: 'ahmed@example.com' },
                    total: 189.00,
                    status: 'processing',
                    items: [{ name: 'Home Jersey 24/25', quantity: 2 }],
                    createdAt: new Date().toISOString()
                },
                {
                    _id: 'ORDC4B9E2',
                    user: { name: 'Sarah J.', email: 'sarah@example.com' },
                    total: 85.00,
                    status: 'shipped',
                    items: [{ name: 'Away Kit Elite', quantity: 1 }],
                    createdAt: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    _id: 'ORDB1A5C3',
                    user: { name: 'Ali Ahmed', email: 'ali@example.com' },
                    total: 120.00,
                    status: 'delivered',
                    items: [{ name: 'Performance Shorts', quantity: 3 }],
                    createdAt: new Date(Date.now() - 172800000).toISOString()
                }
            ]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await adminAPI.updateOrderStatus(orderId, newStatus);
            fetchOrders();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            pending: { label: 'Pending', color: 'text-amber-500', dot: 'bg-amber-500' },
            processing: { label: 'Processing', color: 'text-blue-500', dot: 'bg-blue-500' },
            shipped: { label: 'Shipped', color: 'text-purple-500', dot: 'bg-purple-500' },
            delivered: { label: 'Delivered', color: 'text-green-600', dot: 'bg-green-600' },
            cancelled: { label: 'Cancelled', color: 'text-red-600', dot: 'bg-red-600' }
        };
        return configs[status] || configs.pending;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredOrders = selectedStatus === 'all'
        ? orders
        : orders.filter(order => order.status === selectedStatus);

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">Order Management</h1>
                    <p className="text-sm text-gray-500 font-medium">Track and manage all customer orders.</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-3 bg-[#F8F9FA] text-gray-600 rounded-xl text-[11px] font-black uppercase hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>


            {/* Status Tabs */}
            <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-gray-50 overflow-x-auto">
                {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 whitespace-nowrap ${selectedStatus === status
                            ? 'bg-[#FF0000] text-white shadow-md shadow-red-600/10'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {status}
                        <span className={`px-1.5 py-0.5 rounded-sm text-[9px] ${selectedStatus === status ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                            }`}>
                            {statusCounts[status]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-11 pr-4 py-2.5 bg-[#F8F9FA] border-none rounded-lg text-sm focus:ring-1 focus:ring-gray-200 transition-all outline-none"
                    />
                </div>
                <button className="px-5 py-2.5 bg-[#F8F9FA] text-gray-600 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-transparent">
                    <Filter className="w-4 h-4" /> Filters
                </button>
            </div>


            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-gray-50 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                                <th className="px-8 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-12 text-center text-gray-400">Loading orders...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan="6" className="p-12 text-center text-gray-400 text-xs font-medium">No orders found.</td></tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    const statusConfig = getStatusConfig(order.status);
                                    return (
                                        <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="text-[11px] font-black text-gray-900 uppercase">#{order._id.slice(-6)}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-[11px] font-bold text-gray-900 leading-none">{order.user?.name || 'Guest User'}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">{order.user?.email || 'No email'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-black text-gray-900">${order.total?.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                    className={`text-[9px] font-black uppercase rounded-sm px-2.5 py-1.5 border-none outline-none cursor-pointer bg-[#F8F9FA] transition-all hover:bg-gray-100 ${statusConfig.color}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-[10px] font-bold text-gray-400">{formatDate(order.createdAt)}</span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-5 bg-white border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Showing <span className="text-gray-900 font-black">1-{filteredOrders.length}</span> of <span className="text-gray-900 font-black">{statusCounts['all']}</span> orders
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors disabled:opacity-30">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-7 h-7 rounded-sm bg-[#FF0000] text-white text-[10px] font-black shadow-sm">1</button>
                        <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
