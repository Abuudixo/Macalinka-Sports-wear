import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image (Placeholder until real implementation) */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent z-10" />
                    <div className="absolute inset-0 bg-dark-900 " />
                    {/* Subtle Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}
                    />
                    {/* Decorative Elements */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-white/5 rounded-full blur-[100px] opacity-20 pointer-events-none" />
                </div>

                <div className="container-custom mx-auto relative z-20 pt-20">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6"
                        >
                            Matchday Ready. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
                                Street Approved.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                        >
                            Premium football sportswear designed for elite performance on the pitch and timeless style on the street. Built for the beautiful game.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/shop">
                                <Button size="lg">
                                    Shop The Collection
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <div className="bg-white/5 border-y border-white/5 py-8">
                <div className="container-custom mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { title: 'Shipping', desc: 'Fast delivery nationwide' },
                        { title: 'Premium Quality', desc: 'Professional grade materials' },
                        { title: 'Easy Returns', desc: '30-day return policy' },
                        { title: '24/7 Support', desc: 'Dedicated fan service' },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                                <ArrowRight className="w-5 h-5 -rotate-45" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm uppercase">{item.title}</h4>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Featured Products Section */}
            <section className="py-20 bg-dark-800">
                <div className="container-custom mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Featured Selection</h2>
                            <div className="w-20 h-2 bg-primary" />
                        </div>
                        <Link to="/shop">
                            <Button variant="outline" className="group">
                                View All Products
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
