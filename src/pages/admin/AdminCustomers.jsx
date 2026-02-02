import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
    Search,
    Filter,
    User as UserIcon,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Calendar,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    MoreHorizontal,
    TrendingUp,
    Users
} from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getCustomers();
            if (response.data?.success) {
                setCustomers(response.data.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch customers:', err);
            // Mock data for visualization
            setCustomers([
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '+1 234 567 890',
                    role: 'user',
                    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
                    orderCount: 5,
                    totalSpent: 450.00
                },
                {
                    _id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    phone: '+1 987 654 321',
                    role: 'admin',
                    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
                    orderCount: 12,
                    totalSpent: 1250.50
                },
                {
                    _id: '3',
                    name: 'Mike Johnson',
                    email: 'mike@example.com',
                    phone: '+1 555 123 456',
                    role: 'user',
                    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
                    orderCount: 2,
                    totalSpent: 89.00
                }
            ]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">Customer Management</h1>
                    <p className="text-sm text-gray-500 font-medium">View and manage your registered users and their activity.</p>
                </div>
                <button
                    onClick={fetchCustomers}
                    className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-3 bg-[#F8F9FA] text-gray-600 rounded-xl text-[11px] font-black uppercase hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                >
                    <RefreshCw className="w-4 h-4" /> Refresh
                </button>
            </div>


            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-blue-50/50 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                            +5% <TrendingUp className="w-3 h-3" />
                        </span>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Customers</p>
                        <h2 className="text-2xl font-black text-gray-900 mt-1">{customers.length.toLocaleString()}</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-green-50/50 rounded-lg flex items-center justify-center">
                            <UserCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest">+12 new</span>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">New this month</p>
                        <h2 className="text-2xl font-black text-gray-900 mt-1">124</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-purple-50/50 rounded-lg flex items-center justify-center">
                            <RefreshCw className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">Live</span>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Active Now</p>
                        <h2 className="text-2xl font-black text-gray-900 mt-1">24</h2>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 bg-amber-50/50 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest">+3%</span>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Avg. Order Frequency</p>
                        <h2 className="text-2xl font-black text-gray-900 mt-1">2.4</h2>
                    </div>
                </div>
            </div>

            {/* Search/Filter Bar */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50 flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-11 pr-4 py-2.5 bg-[#F8F9FA] border-none rounded-lg text-sm focus:ring-1 focus:ring-gray-200 transition-all outline-none"
                    />
                </div>
                <button className="px-5 py-2.5 bg-[#F8F9FA] text-gray-600 rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-transparent">
                    <Filter className="w-4 h-4" /> More Filters
                </button>
            </div>


            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-gray-50 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Total Spent</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="7" className="p-12 text-center text-gray-400 text-xs">Loading customers...</td></tr>
                            ) : filteredCustomers.length === 0 ? (
                                <tr><td colSpan="7" className="p-12 text-center text-gray-400 text-xs">No customers found.</td></tr>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-[#C4B28B] flex items-center justify-center border border-white text-white font-black text-xs uppercase shadow-sm">
                                                    {customer.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black text-gray-900 leading-none">{customer.name}</h4>
                                                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">ID: {customer._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                                                    <Mail className="w-3 h-3 text-gray-300" /> {customer.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                                                    <Phone className="w-3 h-3 text-gray-300" /> {customer.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-black text-gray-900">
                                            {customer.orderCount || 0}
                                        </td>
                                        <td className="px-6 py-5 text-xs font-black text-gray-900">
                                            ${(customer.totalSpent || 0).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(customer.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider ${customer.role === 'admin'
                                                ? 'bg-red-50 text-[#FF0000]'
                                                : 'bg-[#F8F9FA] text-gray-400'
                                                }`}>
                                                {customer.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-1">
                                                <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                                    <Mail className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-5 bg-white border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Showing <span className="text-gray-900 font-black">1-{filteredCustomers.length}</span> of <span className="text-gray-900 font-black">{filteredCustomers.length}</span> customers
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

export default AdminCustomers;
