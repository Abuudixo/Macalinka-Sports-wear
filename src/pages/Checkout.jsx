import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const shipping = 7.99;
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const total = cartTotal + shipping + tax;

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment
        setTimeout(() => {
            setIsProcessing(false);
            setOrderSuccess(true);
            clearCart();
        }, 2000);
    };

    if (orderSuccess) {
        return (
            <div className="pt-32 pb-20 container-custom mx-auto min-h-screen text-center">
                <div className="max-w-md mx-auto bg-dark-800 p-12 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-black uppercase mb-4">Order Successful!</h1>
                    <p className="text-gray-400 mb-8">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
                    <Link to="/shop">
                        <Button size="lg" className="w-full uppercase tracking-wider">
                            Back to Shop
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0 && !orderSuccess) {
        return (
            <div className="pt-32 pb-20 container-custom mx-auto min-h-screen text-center">
                <h1 className="text-3xl font-black uppercase mb-4">Your cart is empty</h1>
                <Link to="/shop">
                    <Button>Shop Now</Button>
                </Link>
            </div>
        );
    }
    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen bg-dark-900 text-white">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Left Column: Forms */}
                <div className="flex-grow space-y-8">
                    {/* Step 1: Shipping Info */}
                    <div className="bg-dark-800 p-8 rounded-lg shadow-sm border border-white/5">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                            <h2 className="text-2xl font-black uppercase">Shipping Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white"
                                    defaultValue={user?.name || "John Doe"}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase text-gray-400">Street Address</label>
                                <input type="text" className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white" defaultValue="123 Football Way" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400">City</label>
                                <input type="text" className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white" defaultValue="Houston" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400">State</label>
                                <select className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white appearance-none">
                                    <option>TX</option>
                                    <option>CA</option>
                                    <option>NY</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400">Zip Code</label>
                                <input type="text" className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white" defaultValue="77001" />
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Shipping Method */}
                    <div className="bg-dark-800 p-8 rounded-lg shadow-sm border border-white/5">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                            <h2 className="text-2xl font-black uppercase">Shipping Method</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="border-2 border-primary rounded-lg p-4 flex justify-between items-center cursor-pointer bg-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                                    <div>
                                        <p className="font-bold text-white">Standard US Shipping</p>
                                        <p className="text-xs text-gray-400">3-5 business days</p>
                                    </div>
                                </div>
                                <span className="font-bold text-white">$7.99</span>
                            </div>
                            <div className="border border-white/10 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:border-white/30 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-gray-500 bg-transparent"></div>
                                    <div>
                                        <p className="font-bold text-white">Expedited Shipping</p>
                                        <p className="text-xs text-gray-400">1-2 business days</p>
                                    </div>
                                </div>
                                <span className="font-bold text-white">$19.99</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Payment */}
                    <div className="bg-dark-800 p-8 rounded-lg shadow-sm border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</span>
                                <h2 className="text-2xl font-black uppercase">Secure Payment</h2>
                            </div>
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <form onSubmit={handlePayment} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-400">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input type="text" required className="w-full bg-dark-700 border border-white/10 rounded-md p-3 pl-10 focus:outline-none focus:border-primary text-white" placeholder="•••• •••• ••••" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">Expiry Date</label>
                                    <input type="text" required className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white" placeholder="MM / YY" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-400">CVC</label>
                                    <input type="text" required className="w-full bg-dark-700 border border-white/10 rounded-md p-3 focus:outline-none focus:border-primary text-white" placeholder="•••" />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-4 text-lg uppercase tracking-wider mt-4"
                                size="lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" /> Pay ${total.toFixed(2)} Now
                                    </span>
                                )}
                            </Button>

                            <div className="flex justify-center items-center gap-2 text-xs text-gray-400 uppercase font-bold">
                                <CheckCircle className="w-4 h-4 text-green-500" /> Secure 256-Bit SSL Encrypted
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-dark-800 p-8 rounded-lg shadow-sm sticky top-24 border border-white/5">
                        <h3 className="font-bold text-lg uppercase mb-6 border-b border-white/10 pb-4">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-dark-700 rounded-md overflow-hidden border border-white/10 shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                        <p className="font-bold text-sm mt-1 text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6 text-sm">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white font-bold">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Est. Taxes (8%)</span>
                                <span className="text-white font-bold">${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <div className="flex justify-between text-xl font-black uppercase">
                                <span>Total</span>
                                <span className="text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-8 bg-dark-900 p-4 rounded-lg border border-white/5">
                            <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                    <h5 className="font-bold text-xs uppercase mb-1 text-white">Macaalinka Guarantee</h5>
                                    <p className="text-[10px] text-gray-500 leading-relaxed">
                                        Free 30-day returns and premium quality protection on all orders.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
