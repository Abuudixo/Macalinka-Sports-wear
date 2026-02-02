import { useState, useEffect } from 'react';
import { productsAPI, adminAPI } from '../../services/api';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Package as PackageIcon,
    AlertTriangle,
    TrendingUp,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    ClipboardList,
    DollarSign
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import AddProductModal from '../../components/admin/AddProductModal';
import EditProductModal from '../../components/admin/EditProductModal';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({
        totalProducts: 1240,
        lowStockAlerts: 12,
        inventoryValue: 84500
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, statsRes] = await Promise.all([
                productsAPI.getAll(),
                adminAPI.getStats()
            ]);

            let productData = productsRes.data?.data || productsRes.data || [];

            // Mock data for visualization if empty
            if (Array.isArray(productData) && productData.length === 0) {
                productData = [
                    {
                        _id: '1',
                        name: 'Home Jersey 24/25',
                        subtitle: 'Pro Edition Kit',
                        sku: 'MK-24H-RED',
                        category: 'men',
                        price: 89.00,
                        stock: 124,
                        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff']
                    },
                    {
                        _id: '2',
                        name: 'Away Kit Elite',
                        subtitle: 'Breathable Fabric',
                        sku: 'MK-24A-WHT',
                        category: 'women',
                        price: 85.00,
                        stock: 8,
                        images: ['https://images.unsplash.com/photo-1511746315587-9f173c2b43b7']
                    },
                    {
                        _id: '3',
                        name: 'Training Top Jnr',
                        subtitle: 'Youth Performance',
                        sku: 'MK-24K-NVY',
                        category: 'kids',
                        price: 45.00,
                        stock: 0,
                        images: ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01']
                    },
                    {
                        _id: '4',
                        name: 'Performance Shorts',
                        subtitle: 'Moisture-wicking',
                        sku: 'MK-24-SHRT',
                        category: 'men',
                        price: 35.00,
                        stock: 450,
                        images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b']
                    }
                ];
            }

            setProducts(productData);
            if (statsRes.data?.success) setStats(statsRes.data.data);
        } catch (err) {
            console.error('Failed to fetch inventory data:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600', dot: 'bg-red-600' };
        if (stock < 10) return { label: `${stock} left (Low)`, color: 'text-amber-500', dot: 'bg-amber-500' };
        return { label: `${stock} in stock`, color: 'text-green-600', dot: 'bg-green-600' };
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                await productsAPI.delete(productId);
                fetchData();
            } catch (err) {
                console.error('Failed to delete product:', err);
                alert('Failed to delete product: ' + err.message);
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl lg:text-[32px] font-black text-gray-900 leading-tight tracking-tight">Product Inventory</h1>
                    <p className="text-[#64748B] text-sm font-medium mt-1">Manage your premium sportswear catalog and stock levels.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#DC2626] text-white rounded-xl font-bold transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/20 active:scale-95 shrink-0"
                >
                    <Plus className="w-5 h-5 stroke-[3px]" /> Add New Product
                </button>
            </div>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">

                <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100/50 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                            <ClipboardList className="w-6 h-6 text-[#3B82F6]" />
                        </div>
                        <span className="text-[#10B981] text-[13px] font-bold flex items-center gap-1">
                            +5% <TrendingUp className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="mt-8">
                        <p className="text-[#94A3B8] text-[12px] font-bold uppercase tracking-widest">Total Products</p>
                        <h2 className="text-[32px] font-black text-gray-900 mt-1">{stats.totalProducts.toLocaleString()}</h2>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100/50 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-[#FFFBEB] rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
                        </div>
                        <span className="text-[#EF4444] text-[12px] font-bold uppercase tracking-widest">+2 alerts</span>
                    </div>
                    <div className="mt-8">
                        <p className="text-[#94A3B8] text-[12px] font-bold uppercase tracking-widest">Low Stock Alerts</p>
                        <h2 className="text-[32px] font-black text-gray-900 mt-1">{stats.lowStockAlerts}</h2>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100/50 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-[#22C55E]" />
                        </div>
                        <span className="text-[#10B981] text-[13px] font-bold flex items-center gap-1">
                            +12% <TrendingUp className="w-4 h-4" />
                        </span>
                    </div>
                    <div className="mt-8">
                        <p className="text-[#94A3B8] text-[12px] font-bold uppercase tracking-widest">Inventory Value</p>
                        <h2 className="text-[32px] font-black text-gray-900 mt-1">${stats.inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                    </div>
                </div>
            </div>

            {/* Filters bar */}
            <div className="bg-white p-3 rounded-[20px] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, SKU..."
                        className="w-full pl-14 pr-6 py-3.5 bg-[#F8F9FA] border-none rounded-xl text-[14px] font-medium placeholder:text-[#94A3B8] focus:ring-2 focus:ring-gray-100 transition-all outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3">
                    <div className="relative">
                        <select className="w-full lg:w-auto appearance-none px-6 py-3.5 bg-[#F8F9FA] border-none rounded-xl text-[13px] font-bold text-[#475569] outline-none hover:bg-gray-100 transition-colors cursor-pointer lg:min-w-[170px] pr-10">
                            <option>All Categories</option>
                            <option>Men</option>
                            <option>Women</option>
                            <option>Kids</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                    </div>
                    <div className="relative">
                        <select className="w-full lg:w-auto appearance-none px-6 py-3.5 bg-[#F8F9FA] border-none rounded-xl text-[13px] font-bold text-[#475569] outline-none hover:bg-gray-100 transition-colors cursor-pointer lg:min-w-[170px] pr-10">
                            <option>Stock Status</option>
                            <option>In Stock</option>
                            <option>Low Stock</option>
                            <option>Out of Stock</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] rotate-90" />
                    </div>
                    <button className="lg:w-auto px-6 py-3.5 bg-[#F8F9FA] text-[#475569] rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors sm:col-span-2 lg:col-span-1">
                        <Filter className="w-4 h-4" /> More Filters
                    </button>
                </div>
            </div>


            {/* Product Table */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white border-b border-gray-100 text-[11px] font-bold uppercase text-[#94A3B8] tracking-[0.05em]">
                                <th className="px-4 lg:px-8 py-5">Product</th>
                                <th className="px-4 lg:px-8 py-5">SKU</th>
                                <th className="px-4 lg:px-8 py-5">Category</th>
                                <th className="px-4 lg:px-8 py-5">Price</th>
                                <th className="px-4 lg:px-8 py-5">Stock</th>
                                <th className="px-4 lg:px-8 py-5 text-right">Actions</th>
                            </tr>

                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-12 text-center text-[#94A3B8]">Loading inventory...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan="6" className="p-12 text-center text-[#94A3B8]">No products found.</td></tr>
                            ) : (
                                products.map((product) => {
                                    const stock = getStockStatus(product.stock);
                                    return (
                                        <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-4 lg:px-8 py-6">
                                                <div className="flex items-center gap-3 lg:gap-4">
                                                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl overflow-hidden border border-gray-100 bg-[#F8F9FA] p-1 lg:p-2 flex-shrink-0">
                                                        <img src={product.images?.[0] || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-full object-contain" />
                                                    </div>

                                                    <div>
                                                        <h4 className="text-[15px] font-black text-gray-900 leading-tight">{product.name}</h4>
                                                        <p className="text-[12px] text-[#94A3B8] font-medium mt-1">{product.subtitle || 'Pro Edition Kit'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[13px] font-bold text-[#64748B] font-mono">{product.sku || 'N/A'}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-[#F1F5F9] rounded text-[10px] font-black uppercase text-[#475569] tracking-wider">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[15px] font-black text-gray-900">${product.price.toFixed(2)}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${stock.dot}`}></div>
                                                    <span className={`text-[13px] font-bold ${stock.color}`}>{stock.label}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 text-[#94A3B8] hover:text-gray-900 transition-colors"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 text-[#94A3B8] hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) || []}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 bg-white border-t border-gray-100 flex items-center justify-between">
                    <p className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest">
                        Showing <span className="text-gray-900 font-black">1-10</span> of <span className="text-gray-900 font-black">{stats.totalProducts.toLocaleString()}</span> products
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-[#94A3B8] hover:text-gray-900 transition-colors disabled:opacity-30">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex gap-2">
                            <button className="w-9 h-9 rounded-full bg-[#DC2626] text-white text-[12px] font-black shadow-lg shadow-red-600/20">1</button>
                            <button className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#94A3B8] text-[12px] font-bold transition-colors">2</button>
                            <button className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#94A3B8] text-[12px] font-bold transition-colors">3</button>
                            <span className="w-9 h-9 flex items-center justify-center text-[#CBD5E1] text-[12px]">...</span>
                            <button className="w-9 h-9 rounded-full hover:bg-gray-100 text-[#94A3B8] text-[12px] font-bold transition-colors">124</button>
                        </div>
                        <button className="p-2 text-[#94A3B8] hover:text-gray-900 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={fetchData}
            />

            <EditProductModal
                isOpen={isEditModalOpen}
                product={editingProduct}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingProduct(null);
                }}
                onProductUpdated={fetchData}
            />
        </div>
    );
};

export default Inventory;
