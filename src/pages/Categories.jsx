import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Categories = () => {
    const categories = [
        {
            id: 'men',
            name: 'Men',
            count: '42 items',
            image: 'https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=1000&auto=format&fit=crop',
            description: 'Elite performance kits and training wear for the modern athlete.'
        },
        {
            id: 'women',
            name: 'Women',
            count: '38 items',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
            description: 'Engineered for comfort and style, from professional kits to street style.'
        },
        {
            id: 'kids',
            name: 'Kids',
            count: '24 items',
            image: 'https://images.unsplash.com/photo-1503944583220-8150b7e3c393?q=80&w=1000&auto=format&fit=crop',
            description: 'High-performance gear for the next generation of champions.'
        },

    ];

    return (
        <div className="pt-32 pb-20 container-custom mx-auto min-h-screen">
            <div className="mb-16">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2 text-center">Department</p>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-center">Categories</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-[400px] overflow-hidden rounded-2xl bg-dark-800 border border-white/5"
                    >
                        {/* Background Image Wrapper */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                            <div className="relative transform transition-transform duration-300 group-hover:-translate-y-2">
                                <span className="text-primary font-bold uppercase text-xs tracking-widest mb-2 block">
                                    {cat.count}
                                </span>
                                <h3 className="text-4xl font-black uppercase mb-3 tracking-tighter">{cat.name}</h3>
                                <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                                    {cat.description}
                                </p>
                                <Link
                                    to={`/shop?category=${cat.id}`}
                                    className="inline-flex items-center gap-2 bg-white text-dark-900 px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-colors"
                                >
                                    Explore Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
