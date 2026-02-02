import { useState, useMemo, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { Filter, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

import { useNavigate, useLocation } from 'react-router-dom';

const Shop = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    const initialCategory = queryParams.get('category') || 'all';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(250);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await productsAPI.getAll();
                setProducts(response.data || response || []);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Update state when URL changes
    useEffect(() => {
        setSearchQuery(queryParams.get('search') || '');
        const urlCat = queryParams.get('category');
        if (urlCat) setSelectedCategory(urlCat);
    }, [location.search]);

    const categories = ['all', 'men', 'women', 'kids'];

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products.filter(product => {
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            const priceMatch = product.price <= priceRange;
            const searchMatch = !searchQuery ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
            return categoryMatch && priceMatch && searchMatch;
        });
    }, [products, selectedCategory, priceRange, searchQuery]);

    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
                <div>
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Collection</p>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Shop</h1>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-4">
                    <p className="text-gray-400 text-sm">Showing {filteredProducts.length} results</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="md:hidden flex items-center gap-2"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4" /> Filters
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative">
                {/* Sidebar Filters */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-[280px] bg-dark-900 p-6 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:bg-transparent lg:p-0 lg:w-64 lg:shadow-none lg:block
                    ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center lg:hidden mb-8">
                        <h2 className="text-2xl font-black uppercase">Filters</h2>
                        <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white p-2">
                            <ChevronDown className="w-6 h-6 rotate-90" />
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
                            Category <ChevronDown className="w-4 h-4" />
                        </h3>
                        <ul className="space-y-3">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setShowFilters(false);
                                        }}
                                        className={`text-sm uppercase font-medium transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h3 className="font-bold text-lg uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                            Price Range
                        </h3>
                        <div className="px-2">
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-primary h-1 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-400 mt-2">
                                <span>$0</span>
                                <span className="text-white font-bold">${priceRange}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile filters */}
                {showFilters && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm lg:hidden"
                        onClick={() => setShowFilters(false)}
                    />
                )}

                {/* Product Grid */}
                <div className="flex-grow">
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
                            <p className="text-lg font-bold uppercase tracking-widest">Loading Catalog...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-96 flex flex-col items-center justify-center text-gray-400 border border-dashed border-white/10 rounded-lg bg-dark-800/50">
                            <Filter className="w-12 h-12 mb-4 opacity-50" />
                            <p className="text-lg font-bold uppercase tracking-widest">No products found</p>
                            <p className="text-sm">Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
