import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { Share2, ChevronRight, Truck, ShieldCheck, RefreshCw, Star, Plus, Minus } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        // Simulate fetching
        const found = products.find(p => p.id === parseInt(id));
        setProduct(found);
    }, [id]);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    const sizes = ['S', 'M', 'L', 'XL', '2XL'];

    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-12 uppercase tracking-wide font-medium">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <span className="text-white font-bold truncate max-w-[200px]">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] bg-dark-800 rounded-xl overflow-hidden shadow-2xl shadow-black">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-primary' : 'border-transparent hover:border-white/20'}`}>
                                <img src={product.image} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">{product.category} Collection</span>
                        <div className="flex gap-4">
                            <button className="text-gray-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{product.name}</h1>
                    <p className="text-2xl font-bold text-white mb-6">${product.price}</p>

                    <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/10 pb-8">
                        {product.description} Engineered for the modern athlete, featuring advanced moisture-wicking technology and a precision fit that moves with you.
                    </p>

                    {/* Size Selector */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold uppercase tracking-wider text-sm">Select Size</span>
                            <Link to="/size-guide" className="text-xs text-primary underline">Size Guide</Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-14 h-14 rounded-full font-bold transition-all duration-200 flex items-center justify-center border-2 ${selectedSize === size
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-white/10 text-gray-400 hover:border-white hover:text-white'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4 mb-10">
                        <Button
                            size="lg"
                            className="w-full text-lg uppercase tracking-wider py-5"
                            onClick={() => addToCart(product, quantity)}
                        >
                            Add to Cart - ${(product.price * quantity).toFixed(2)}
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                            <Truck className="w-6 h-6 text-primary" />
                            <span>Free shipping on orders over $150</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                            <RefreshCw className="w-6 h-6 text-primary" />
                            <span>30-Day Free Returns</span>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg md:col-span-2">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                            <span>Authentic Professional Gear Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
