import { useState, useRef } from 'react';
import { X, Upload, Plus, Loader2 } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { Button } from '../../components/ui/Button';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        sku: '',
        category: 'men',
        price: '',
        stock: '',
        description: '',
        sizes: ['S', 'M', 'L', 'XL'],
        isNew: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSizeToggle = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'sizes') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            if (fileInputRef.current?.files[0]) {
                submitData.append('images', fileInputRef.current.files[0]);
            }

            await productsAPI.create(submitData);
            onProductAdded?.();
            onClose();

            // Reset form
            setFormData({
                name: '',
                subtitle: '',
                sku: '',
                category: 'men',
                price: '',
                stock: '',
                description: '',
                sizes: ['S', 'M', 'L', 'XL'],
                isNew: true
            });
            setImagePreview(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                        <div>
                            <h2 className="text-2xl font-black uppercase text-gray-900">Add New Product</h2>
                            <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new product to your catalog.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Image Upload */}
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-3">Product Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors group"
                            >
                                {imagePreview ? (
                                    <div className="relative w-32 h-32 mx-auto">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3 group-hover:text-primary transition-colors" />
                                        <p className="text-sm text-gray-500">Click to upload product image</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Name & Subtitle */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Home Jersey 24/25"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={formData.subtitle}
                                    onChange={handleChange}
                                    placeholder="Pro Edition Kit"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>

                        {/* SKU & Category */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">SKU *</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                    placeholder="MK-24H-RED"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 outline-none uppercase"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-primary/20 outline-none"
                                >
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kids">Kids</option>
                                </select>
                            </div>
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Price ($) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="89.00"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Stock Quantity *</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    placeholder="100"
                                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-3">Available Sizes</label>
                            <div className="flex gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleSizeToggle(size)}
                                        className={`w-12 h-12 rounded-lg text-xs font-black uppercase transition-all ${formData.sizes.includes(size)
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-black uppercase text-gray-500 tracking-widest mb-2">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                placeholder="Premium sportswear made with breathable, moisture-wicking fabric..."
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            ></textarea>
                        </div>

                        {/* Is New */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isNew"
                                name="isNew"
                                checked={formData.isNew}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="isNew" className="text-sm font-bold text-gray-700">Mark as New Arrival</label>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-black uppercase hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 h-auto uppercase tracking-wider font-black"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" /> Create Product
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
