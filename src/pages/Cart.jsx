import React from 'react';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const shipping = 0.00;
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const total = cartTotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 pb-20 container-custom mx-auto min-h-screen text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
                        <ShoppingBag className="w-10 h-10 text-gray-500" />
                    </div>
                    <h1 className="text-3xl font-black uppercase mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet. Let's find some elite gear!</p>
                    <Link to="/shop">
                        <Button size="lg" className="w-full uppercase tracking-wider">
                            Explore Shop
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen">
            <h1 className="text-4xl font-black uppercase mb-8">Your Cart ({cartItems.length})</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-grow space-y-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-6 p-6 bg-dark-800 rounded-lg border border-white/5 items-center">
                            <div className="w-24 h-24 bg-dark-700 rounded-md overflow-hidden shrink-0 border border-white/5">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-white">{item.name}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-full"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2 bg-dark-900 rounded-lg p-1 border border-white/5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-white/10 rounded-md"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="font-bold w-8 text-center text-white">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-white/10 rounded-md"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <span className="font-bold text-lg text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest font-bold">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
                    </Link>
                </div>

                {/* Summary */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-dark-800 p-8 rounded-lg shadow-sm border border-white/5 sticky top-24">
                        <h2 className="text-xl font-black uppercase mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Subtotal</span>
                                <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Shipping</span>
                                <span className="text-green-500 font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-400 text-sm">
                                <span>Estimated Tax (8%)</span>
                                <span className="text-white font-bold">${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                                <span className="font-black uppercase tracking-tighter">Total</span>
                                <span className="text-3xl font-black text-primary leading-none">${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout">
                            <Button className="w-full py-6 uppercase tracking-widest text-lg" size="lg">
                                Checkout <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
                                Secure checkout powered by Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
