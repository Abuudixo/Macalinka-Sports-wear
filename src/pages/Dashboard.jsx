import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, User, MapPin, CreditCard, LogOut, ChevronRight, LayoutGrid, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

const OverviewTab = ({ user }) => {
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 123-4567'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        updateUser(formData);
        setIsSaving(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="space-y-8">
            {/* Recent Orders */}
            <div className="bg-dark-800 rounded-lg shadow-sm overflow-hidden border border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-black uppercase text-lg text-white">Recent Orders</h3>
                    <button className="text-primary text-xs font-bold uppercase">View All</button>
                </div>
                <div className="divide-y divide-white/5">
                    {[
                        { id: '#MC-99421', date: 'Oct 24, 2024', status: 'Shipped', total: '$124.99', statusColor: 'bg-green-500/10 text-green-500' },
                        { id: '#MC-98124', date: 'Sep 12, 2024', status: 'Processing', total: '$89.99', statusColor: 'bg-blue-500/10 text-blue-500' },
                        { id: '#MC-97552', date: 'Aug 30, 2024', status: 'Delivered', total: '$215.50', statusColor: 'bg-gray-500/10 text-gray-400' },
                    ].map(order => (
                        <div key={order.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-center">
                                <div>
                                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Order ID</p>
                                    <p className="font-bold text-sm text-white">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Date</p>
                                    <p className="font-medium text-sm text-gray-300">{order.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Status</p>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${order.statusColor}`}>{order.status}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase text-gray-400 font-bold mb-1">Total</p>
                                    <p className="font-black text-sm text-white">{order.total}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors ml-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Personal Info */}
            <div className="bg-dark-800 rounded-lg shadow-sm border border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="font-black uppercase text-lg text-white">Personal Information</h3>
                    {message && <span className="text-green-500 text-xs font-bold uppercase animate-pulse">{message}</span>}
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

const OrdersTab = () => (
    <div className="bg-dark-800 rounded-lg shadow-sm p-8 text-center border border-white/5">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">My Orders</h3>
        <p className="text-gray-400 mb-6">Track and view your order history here.</p>
        <Button>Start Shopping</Button>
    </div>
);

const AddressTab = () => (
    <div className="bg-dark-800 rounded-lg shadow-sm p-8 text-center border border-white/5">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">Address Book</h3>
        <p className="text-gray-400 mb-6">Manage your shipping and billing addresses.</p>
        <Button>Add New Address</Button>
    </div>
);

const PaymentTab = () => (
    <div className="bg-dark-800 rounded-lg shadow-sm p-8 text-center border border-white/5">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">Payment Methods</h3>
        <p className="text-gray-400 mb-6">Securely manage your payment options.</p>
        <Button>Add New Card</Button>
    </div>
);


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab user={user} />;
            case 'orders': return <OrdersTab />;
            case 'address': return <AddressTab user={user} />;
            case 'payment': return <PaymentTab />;
            default: return <OverviewTab user={user} />;
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
                                {user.name.charAt(0)}
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
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
