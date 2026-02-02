import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, addressesAPI } from '../services/api';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight, LayoutGrid, Home, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const OverviewTab = ({ user, orders }) => {
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateUser(formData);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to update profile');
        }
        setIsSaving(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-500/10 text-green-500';
            case 'shipped': return 'bg-blue-500/10 text-blue-500';
            case 'processing': return 'bg-yellow-500/10 text-yellow-500';
            case 'pending': return 'bg-gray-500/10 text-gray-400';
            case 'cancelled': return 'bg-red-500/10 text-red-500';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <div className="space-y-8">
            {/* Recent Orders */}
            <div className="bg-dark-800 rounded-lg shadow-sm overflow-hidden border border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-black uppercase text-lg text-white">Recent Orders</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {orders.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">
                            No orders yet. <Link to="/shop" className="text-primary hover:underline">Start shopping</Link>
                        </div>
                    ) : (
                        orders.slice(0, 3).map(order => (
                            <div key={order._id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-center">
                                    <div>
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Order ID</p>
                                        <p className="font-bold text-sm text-white">#{order._id.slice(-6).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Date</p>
                                        <p className="font-medium text-sm text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Status</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(order.status)}`}>{order.status}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs uppercase text-gray-400 font-bold mb-1">Total</p>
                                        <p className="font-black text-sm text-white">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-4" />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-dark-800 rounded-lg shadow-sm border border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-black uppercase text-lg text-white">Personal Information</h3>
                    {message && <span className={`text-xs font-bold uppercase animate-pulse ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>{message}</span>}
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-dark-700 border border-white/10 rounded-md p-3 text-sm font-medium text-white focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 block mb-2">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-dark-700 border border-white/10 rounded-md p-3 text-sm font-medium text-white focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 block mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-dark-700 border border-white/10 rounded-md p-3 text-sm font-medium text-white focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-6">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const OrdersTab = ({ orders }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'bg-green-500/10 text-green-500';
            case 'shipped': return 'bg-blue-500/10 text-blue-500';
            case 'processing': return 'bg-yellow-500/10 text-yellow-500';
            case 'pending': return 'bg-gray-500/10 text-gray-400';
            case 'cancelled': return 'bg-red-500/10 text-red-500';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    if (orders.length === 0) {
        return (
            <div className="bg-dark-800 rounded-lg shadow-sm p-8 text-center border border-white/5">
                <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">No Orders Yet</h3>
                <p className="text-gray-400 mb-6">Start shopping to see your orders here.</p>
                <Link to="/shop"><Button>Start Shopping</Button></Link>
            </div>
        );
    }

    return (
        <div className="bg-dark-800 rounded-lg shadow-sm overflow-hidden border border-white/5">
            <div className="divide-y divide-white/5">
                {orders.map(order => (
                    <div key={order._id} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-bold text-white">Order #{order._id.slice(-6).toUpperCase()}</p>
                                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getStatusColor(order.status)}`}>{order.status}</span>
                        </div>
                        <div className="flex gap-2 mb-4">
                            {order.items.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="w-12 h-12 bg-dark-700 rounded border border-white/10 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {order.items.length > 3 && (
                                <div className="w-12 h-12 bg-dark-700 rounded border border-white/10 flex items-center justify-center text-xs text-gray-400">
                                    +{order.items.length - 3}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-400">{order.items.length} item(s)</p>
                            <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AddressTab = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', street: '', city: '', state: '', zip: '', isDefault: false
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await addressesAPI.getAll();
            setAddresses(response.data || []);
        } catch (err) {
            console.error('Failed to fetch addresses:', err);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addressesAPI.add(formData);
            fetchAddresses();
            setShowForm(false);
            setFormData({ fullName: '', street: '', city: '', state: '', zip: '', isDefault: false });
        } catch (err) {
            console.error('Failed to add address:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await addressesAPI.delete(id);
            fetchAddresses();
        } catch (err) {
            console.error('Failed to delete address:', err);
        }
    };

    if (loading) {
        return <div className="text-center p-8 text-gray-400">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            {addresses.length > 0 && (
                <div className="grid gap-4">
                    {addresses.map(addr => (
                        <div key={addr._id} className="bg-dark-800 rounded-lg p-6 border border-white/5 flex justify-between items-start">
                            <div>
                                <p className="font-bold text-white">{addr.fullName}</p>
                                <p className="text-sm text-gray-400">{addr.street}</p>
                                <p className="text-sm text-gray-400">{addr.city}, {addr.state} {addr.zip}</p>
                                {addr.isDefault && <span className="text-xs text-primary font-bold uppercase mt-2 inline-block">Default</span>}
                            </div>
                            <button onClick={() => handleDelete(addr._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {showForm ? (
                <form onSubmit={handleSubmit} className="bg-dark-800 rounded-lg p-6 border border-white/5 space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-md p-3 text-white"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full bg-dark-700 border border-white/10 rounded-md p-3 text-white"
                        required
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="bg-dark-700 border border-white/10 rounded-md p-3 text-white"
                            required
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="bg-dark-700 border border-white/10 rounded-md p-3 text-white"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Zip"
                            value={formData.zip}
                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                            className="bg-dark-700 border border-white/10 rounded-md p-3 text-white"
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit">Save Address</Button>
                        <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                </form>
            ) : (
                <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add New Address
                </Button>
            )}
        </div>
    );
};

const PaymentTab = () => (
    <div className="bg-dark-800 rounded-lg shadow-sm p-8 text-center border border-white/5">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">Payment Methods</h3>
        <p className="text-gray-400 mb-6">Payment methods are collected during checkout.</p>
    </div>
);


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            if (isAuthenticated) {
                try {
                    const response = await ordersAPI.getAll();
                    setOrders(response.data || []);
                } catch (err) {
                    console.error('Failed to fetch orders:', err);
                }
                setOrdersLoading(false);
            }
        };
        fetchOrders();
    }, [isAuthenticated]);

    if (!isAuthenticated || !user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab user={user} orders={orders} />;
            case 'orders': return <OrdersTab orders={orders} />;
            case 'address': return <AddressTab />;
            case 'payment': return <PaymentTab />;
            default: return <OverviewTab user={user} orders={orders} />;
        }
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutGrid },
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'address', label: 'Addresses', icon: Home },
        { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    ];

    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen bg-dark-900 text-white">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="bg-dark-800 rounded-lg p-6 border border-white/5 sticky top-24">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-xl font-black uppercase text-white">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <h2 className="font-black uppercase text-white truncate">{user.name}</h2>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wide transition-all ${activeTab === item.id
                                        ? 'bg-primary text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wide text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all mt-4"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-grow">
                    {ordersLoading && activeTab === 'overview' ? (
                        <div className="text-center p-8 text-gray-400">Loading...</div>
                    ) : (
                        renderContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
