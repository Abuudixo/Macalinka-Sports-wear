import { useState } from 'react';
import {
    Settings,
    Bell,
    Shield,
    Globe,
    Save,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl lg:text-4xl font-black uppercase text-gray-900">Admin Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Configure your store preferences and manage your account.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="flex flex-row lg:flex-col lg:w-64 shrink-0 gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] lg:text-sm font-black uppercase transition-all whitespace-nowrap min-w-max lg:min-w-0 lg:w-full ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                            {tab.label}
                        </button>
                    ))}
                </div>


                {/* Content Area */}
                <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase text-gray-900 mb-6">Store Configuration</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Store Name</label>
                                            <input type="text" defaultValue="Macaalinka Sportswear" className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Contact Email</label>
                                            <input type="email" defaultValue="support@macaalinka.com" className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Currency</label>
                                            <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm font-bold outline-none">
                                                <option>USD ($)</option>
                                                <option>EUR (€)</option>
                                                <option>GBP (£)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2 text-primary font-black">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Maintenance Mode</label>
                                            <div className="flex items-center gap-3 pt-2">
                                                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-xs uppercase">Disabled</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-100 flex justify-end">
                                    <Button className="px-8 py-3 uppercase font-black tracking-widest flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save General Settings
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase text-gray-900 mb-6">Admin Profile</h3>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 relative group cursor-pointer hover:border-primary/50 transition-colors">
                                            <User className="w-8 h-8 text-gray-300" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                                                <p className="text-[10px] font-black uppercase text-white">Change</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-gray-900 uppercase">Administrator</h4>
                                            <p className="text-sm text-gray-500">Super Admin Access</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Full Name</label>
                                            <input type="text" defaultValue="Macaalinka Admin" className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Public Email</label>
                                            <input type="email" defaultValue="admin@macaalinka.com" className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-100 flex justify-end">
                                    <Button className="px-8 py-3 uppercase font-black tracking-widest flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Update Profile
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase text-gray-900 mb-6">Account Security</h3>
                                    <div className="max-w-md space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                                />
                                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">New Password</label>
                                            <input type="password" underline className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Confirm New Password</label>
                                            <input type="password" underline className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-gray-100 flex justify-end">
                                    <Button className="px-8 py-3 uppercase font-black tracking-widest flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Update Password
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
