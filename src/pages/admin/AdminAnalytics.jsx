import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
    BarChart2,
    TrendingUp,
    PieChart,
    Activity,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Download,
    Eye,
    ChevronDown
} from 'lucide-react';

const AdminAnalytics = () => {
    const [analytics, setAnalytics] = useState({
        salesTrend: [],
        salesByCategory: [],
        topProducts: []
    });
    const [loading, setLoading] = useState(true);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await adminAPI.getAnalytics();
            if (response.data?.success) {
                setAnalytics(response.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch analytics:', err);
            // Mock data for visualization
            setAnalytics({
                salesTrend: [
                    { _id: '2026-01-26', revenue: 450, orders: 5 },
                    { _id: '2026-01-27', revenue: 620, orders: 8 },
                    { _id: '2026-01-28', revenue: 380, orders: 4 },
                    { _id: '2026-01-29', revenue: 890, orders: 12 },
                    { _id: '2026-01-30', revenue: 1200, orders: 15 },
                    { _id: '2026-01-31', revenue: 950, orders: 10 },
                    { _id: '2026-02-01', revenue: 750, orders: 7 }
                ],
                salesByCategory: [
                    { _id: 'men', revenue: 2450, count: 45 },
                    { _id: 'women', revenue: 1850, count: 32 },
                    { _id: 'kids', revenue: 650, count: 18 }
                ],
                topProducts: [
                    { name: 'Home Jersey 24/25', sold: 24, revenue: 2136 },
                    { name: 'Training Elite Shorts', sold: 18, revenue: 630 },
                    { name: 'Away Kit 24/25', sold: 15, revenue: 1275 }
                ]
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const maxRevenue = Math.max(...analytics.salesTrend.map(d => d.revenue), 1);
    const totalRevenue = analytics.salesByCategory.reduce((acc, c) => acc + c.revenue, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">Analytics & Insights</h1>
                    <p className="text-sm text-gray-500 font-medium">Deep dive into your store's performance and sales trends.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={fetchAnalytics}
                        className="flex-grow sm:flex-grow-0 p-3 flex justify-center bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-gray-900 transition-colors shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="flex-grow sm:flex-grow-0 justify-center flex items-center gap-2 px-5 py-3 bg-[#FF0000] text-white rounded-xl text-[11px] font-black uppercase hover:bg-red-700 transition-all shadow-md shadow-red-600/10">
                        <Download className="w-4 h-4" /> Export Report
                    </button>
                </div>
            </div>

            {/* Main Sales Trend Chart */}


            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-xs font-black uppercase text-gray-900 flex items-center gap-2 tracking-wider">
                            <TrendingUp className="w-4 h-4 text-[#FF0000]" /> Revenue Forecast
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Feb 1 - Feb 7, 2026</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FA] rounded-lg border border-gray-100 cursor-pointer hover:bg-white transition-colors">
                            <span className="text-[9px] font-black uppercase text-gray-600">Weekly</span>
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="h-64 flex items-end gap-3 pb-2 pt-4">
                    {analytics.salesTrend.map((day, idx) => {
                        const height = (day.revenue / maxRevenue) * 200;
                        return (
                            <div key={idx} className="flex-grow flex flex-col items-center gap-4 group min-w-[50px]">
                                <div className="relative w-full flex justify-center">
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-[9px] font-black py-1.5 px-2.5 rounded shadow-xl whitespace-nowrap z-10 translate-y-1 group-hover:translate-y-0">
                                        ${day.revenue.toLocaleString()}
                                    </div>
                                    {/* Bar Wrapper */}
                                    <div className="w-full max-w-[40px] flex items-end justify-center h-[200px]">
                                        <div
                                            className="w-full bg-[#F1F5F9] group-hover:bg-[#E2E8F0] rounded-lg transition-all duration-500 relative overflow-hidden flex items-end"
                                            style={{ height: `${height}px` }}
                                        >
                                            {/* Accent Gradient Bottom */}
                                            <div className="w-full bg-[#FF0000] opacity-80 h-[30%] group-hover:opacity-100 transition-all"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[9px] font-black uppercase text-gray-500 group-hover:text-gray-900 transition-colors tracking-tighter">
                                    {new Date(day._id).toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales by Category */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-xs font-black uppercase text-gray-900 flex items-center gap-2 mb-8 tracking-wider">
                        <PieChart className="w-4 h-4 text-blue-500" /> Product Breakdown
                    </h3>
                    <div className="space-y-6">
                        {analytics.salesByCategory.map((cat, idx) => {
                            const percentage = (cat.revenue / totalRevenue) * 100;
                            return (
                                <div key={idx} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase text-gray-900 tracking-wider">{cat._id} Apparel</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">${cat.revenue.toLocaleString()} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <div className="h-2 bg-[#F8F9FA] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${cat._id === 'men' ? 'bg-[#FF0000]' :
                                                cat._id === 'women' ? 'bg-blue-500' : 'bg-[#C4B28B]'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Channel Sales</span>
                            <span className="text-sm font-black text-gray-900">${totalRevenue.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <h3 className="text-xs font-black uppercase text-gray-900 flex items-center gap-2 mb-8 tracking-wider">
                        <Activity className="w-4 h-4 text-green-500" /> Core Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-100 group hover:border-red-500/20 transition-all flex flex-col justify-between">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Conversion</p>
                            <div className="flex items-end justify-between mt-3">
                                <h4 className="text-xl font-black text-gray-900">3.8%</h4>
                                <span className="text-[9px] font-black text-green-500 flex items-center gap-0.5">
                                    +0.4% <ArrowUpRight className="w-2.5 h-2.5" />
                                </span>
                            </div>
                        </div>
                        <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-100 group hover:border-blue-500/20 transition-all flex flex-col justify-between">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Avg. Order</p>
                            <div className="flex items-end justify-between mt-3">
                                <h4 className="text-xl font-black text-gray-900">$84.50</h4>
                                <span className="text-[9px] font-black text-green-500 flex items-center gap-0.5">
                                    +$12 <ArrowUpRight className="w-2.5 h-2.5" />
                                </span>
                            </div>
                        </div>
                        <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-100 group hover:border-amber-500/20 transition-all flex flex-col justify-between">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Live Users</p>
                            <div className="flex items-end justify-between mt-3">
                                <h4 className="text-xl font-black text-gray-900">124</h4>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black text-amber-500 uppercase">Live</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-100 group hover:border-purple-500/20 transition-all flex flex-col justify-between">
                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Return Rate</p>
                            <div className="flex items-end justify-between mt-3">
                                <h4 className="text-xl font-black text-gray-900">1.2%</h4>
                                <span className="text-[9px] font-black text-green-500 flex items-center gap-0.5">
                                    -0.2% <ArrowDownRight className="w-2.5 h-2.5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
