import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-8">
            <div className="container-custom mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <Logo className="w-12 h-12 text-primary" classNameText="text-2xl" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Born on the pitch, refined for the street. MACAALINKA is a premium football clothes store dedicated to the athletes and fans who live for the game.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <Youtube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            Shop <span className="w-8 h-1 bg-primary inline-block"></span>
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/shop?category=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link to="/shop?category=men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                            <li><Link to="/shop?category=women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                            <li><Link to="/shop?category=kids" className="hover:text-primary transition-colors">Kids' Fan Shop</Link></li>
                            <li><Link to="/shop?category=clearance" className="hover:text-primary transition-colors">Clearance</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            Support <span className="w-8 h-1 bg-primary inline-block"></span>
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/order-tracking" className="hover:text-primary transition-colors">Order Tracking</Link></li>
                            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-primary transition-colors">Return Center</Link></li>
                            <li><Link to="/size-guide" className="hover:text-primary transition-colors">Size Guide</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            Contact <span className="w-8 h-1 bg-primary inline-block"></span>
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:support@macaalinka.com" className="hover:text-white transition-colors">support@macaalinka.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:+18006222254652" className="hover:text-white transition-colors">+1 (800) MACAALINKA</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                        © 2026 MACAALINKA SPORTSWEAR. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-gray-500 uppercase tracking-wide">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
