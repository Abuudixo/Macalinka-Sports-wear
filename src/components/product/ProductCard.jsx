import { useRef } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { addToCart } = useCart();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="group bg-dark-800 rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
        >
            {/* Image Container */}
            <div className="relative h-96 overflow-hidden bg-dark-700">
                <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                {product.isNew && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                        New
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product, 1, 'M');
                        }}
                        className="bg-white text-dark-900 p-3 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <Link to={`/product/${product._id || product.id}`} className="bg-white text-dark-900 p-3 rounded-full hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150">
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <Link to={`/product/${product._id || product.id}`}>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <div className="flex gap-1">
                        {/* Color swatches placeholder */}
                        <div className="w-4 h-4 rounded-full bg-red-600 border border-white/20" />
                        <div className="w-4 h-4 rounded-full bg-blue-600 border border-white/20" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
