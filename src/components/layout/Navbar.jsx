import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, ShoppingCart, User, Search, Menu, X, Heart, LogOut, ArrowRight } from 'lucide-react';
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

            {/* Mobile Menu Overlay & Drawer */}
            {createPortal(
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-dark-900 border-l border-white/10 z-[70] md:hidden overflow-y-auto"
                            >
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-xl font-black uppercase text-white tracking-tighter">Menu</h2>
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-6 flex-grow">
                                        <div className="relative">
                                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="text"
                                                placeholder="Search gear..."
                                                className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyDown={handleSearch}
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <NavLink
                                                to="/shop"
                                                onClick={() => setIsMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `py-3 text-lg font-black uppercase tracking-tight flex items-center justify-between border-b border-white/5 ${isActive ? 'text-primary' : 'text-gray-300'}`
                                                }
                                            >
                                                Shop
                                                <ArrowRight className="w-4 h-4 opacity-50" />
                                            </NavLink>

                                            <div className="py-2 border-b border-white/5">
                                                <button
                                                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                                    className="w-full py-1 flex items-center justify-between text-lg font-black uppercase tracking-tight text-gray-300"
                                                >
                                                    Categories
                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {isCategoriesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pt-2 pl-4 flex flex-col space-y-2">
                                                                {categories.map((cat) => (
                                                                    <Link
                                                                        key={cat.name}
                                                                        to={cat.path}
                                                                        onClick={() => {
                                                                            setIsMenuOpen(false);
                                                                            setIsCategoriesOpen(false);
                                                                        }}
                                                                        className="py-2 text-sm font-bold uppercase text-gray-400 hover:text-primary transition-colors block"
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
                                                                    className="py-2 text-xs font-black uppercase tracking-wider text-primary block"
                                                                >
                                                                    View All Categories
                                                                </Link>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <NavLink
                                                to="/contact"
                                                onClick={() => setIsMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `py-3 text-lg font-black uppercase tracking-tight flex items-center justify-between border-b border-white/5 ${isActive ? 'text-primary' : 'text-gray-300'}`
                                                }
                                            >
                                                Contact
                                                <ArrowRight className="w-4 h-4 opacity-50" />
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        {user ? (
                                            <div className="space-y-4">
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{user.name}</p>
                                                        <p className="text-xs text-gray-400">View Dashboard</p>
                                                    </div>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setIsMenuOpen(false);
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase text-red-500 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-4">
                                                <Link
                                                    to="/login"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="py-3 text-center text-sm font-bold uppercase text-white bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                                                >
                                                    Sign In
                                                </Link>
                                                <Link
                                                    to="/signup"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="py-3 text-center text-sm font-bold uppercase text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                                >
                                                    Sign Up
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </nav>
    );
};

export default Navbar;
