import { Button } from '../components/ui/Button';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 container-custom mx-auto min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Get In Touch</h1>
                <div className="w-24 h-2 bg-primary mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Contact Information</h3>

                            <div className="space-y-6">

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email Support</h4>
                                        <p className="text-gray-400 text-sm">support@macaalinka.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Direct Line</h4>
                                        <p className="text-gray-400 text-sm">+1 (800) MACAALINKA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Follow The Squad</h3>
                            <div className="flex gap-4">
                                {['Instagram', 'TikTok', 'Twitter'].map(social => (
                                    <button key={social} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark-900 transition-all">
                                        {/* Icons would go here */}
                                        <span className="sr-only">{social}</span>
                                        <div className="w-5 h-5 bg-current rounded-sm" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp / Chat Card */}
                    <div className="bg-dark-800 text-white rounded-2xl p-10 shadow-2xl relative overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-8 -mt-8 z-0" />

                        <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/20">
                                <MessageCircle className="w-8 h-8" />
                            </div>

                            <h3 className="text-3xl font-black uppercase mb-4">Chat With Us On WhatsApp</h3>
                            <p className="text-gray-400 mb-8 max-w-xs">
                                Get instant support for order inquiries, sizing advice, or product details. Our team is ready to assist you in real-time.
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl mb-8 border border-white/10">
                                {/* Mock QR Code */}
                                <div className="w-32 h-32 bg-white p-2 mx-auto mb-2">
                                    <div className="w-full h-full bg-dark-900 flex items-center justify-center text-white text-[10px] text-center">
                                        SCAN ME
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full uppercase tracking-wider font-black py-4">
                                Message Us On WhatsApp
                            </Button>

                            <div className="mt-8 text-xs text-gray-500 space-y-1">
                                <p className="font-bold uppercase tracking-wider text-gray-400">Live Support Hours</p>
                                <p>Monday - Friday: 08:00 AM - 10:00 PM CST</p>
                                <p>Saturday - Sunday: 10:00 AM - 06:00 PM CST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
