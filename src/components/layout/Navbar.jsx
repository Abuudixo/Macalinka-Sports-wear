import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User, Search, Menu, X, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const categories = [
        { name: 'Men', path: '/shop?category=men' },
        { name: 'Women', path: '/shop?category=women' },
        { name: 'Kids', path: '/shop?category=kids' },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Categories', path: '/categories' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-white/5">
            <div className="container-custom mx-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/">
                        <Logo className="w-10 h-10 text-white" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink
                            to="/shop"
                            className={({ isActive }) =>
                                `text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white'}`
                            }
                        >
                            Shop
                        </NavLink>

                        {/* Dropdown Toggle */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsCategoriesOpen(true)}
                            onMouseLeave={() => setIsCategoriesOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isCategoriesOpen ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                            >
                                Categories
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isCategoriesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 pt-4 w-48"
                                    >
                                        <div className="bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.name}
                                                    to={cat.path}
                                                    onClick={() => setIsCategoriesOpen(false)}
                                                    className="block px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-white/5 hover:text-primary transition-all"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                            <div className="border-t border-white/5 mt-2 pt-2">
                                                <Link
                                                    to="/categories"
                                                    onClick={() => setIsCategoriesOpen(false)}
                                                    className="block px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all text-center"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-300 hover:text-white'}`
                            }
                        >
                            Contact
                        </NavLink>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search kits..."
                                className="bg-dark-800 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-64 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>


                        <Link to="/cart" className="text-gray-300 hover:text-white transition-colors relative">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-bold truncate max-w-[80px]">{user.name}</span>
                                </Link>
                                <button onClick={logout} className="text-gray-400 hover:text-primary transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                                <User className="w-6 h-6" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-2"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-dark-900 border-t border-white/10 absolute w-full left-0 shadow-2xl">
                    <div className="container-custom py-6 flex flex-col gap-6">
                        <div className="relative">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search gear..."
                                className="bg-dark-800 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <NavLink
                                to="/shop"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg font-black uppercase tracking-tighter text-gray-300 hover:text-white"
                            >
                                Shop
                            </NavLink>

                            <div className="space-y-4">
                                <button
                                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                    className="w-full flex items-center justify-between text-lg font-black uppercase tracking-tighter text-gray-300 hover:text-white"
                                >
                                    Categories
                                    <ChevronDown className={`w-6 h-6 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isCategoriesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-white/5 rounded-xl"
                                        >
                                            <div className="flex flex-col py-2">
                                                {categories.map((cat) => (
                                                    <Link
                                                        key={cat.name}
                                                        to={cat.path}
                                                        onClick={() => {
                                                            setIsMenuOpen(false);
                                                            setIsCategoriesOpen(false);
                                                        }}
                                                        className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary"
                                                    >
                                                        {cat.name}
                                                    </Link>
                                                ))}
                                                <Link
                                                    to="/categories"
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        setIsCategoriesOpen(false);
                                                    }}
                                                    className="px-6 py-3 text-xs font-black uppercase tracking-widest text-primary border-t border-white/5"
                                                >
                                                    Full Directory
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <NavLink
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-lg font-black uppercase tracking-tighter text-gray-300 hover:text-white"
                            >
                                Contact
                            </NavLink>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-white relative">
                                        <ShoppingCart className="w-7 h-7" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-400">{user.name}</span>
                                        <button onClick={logout} className="text-primary font-bold uppercase text-xs">Logout</button>
                                    </div>
                                ) : (
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold uppercase text-primary">Sign In</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
