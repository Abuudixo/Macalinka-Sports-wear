const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const users = [
    {
        name: 'Admin User',
        email: 'admin@macaalinka.com',
        password: 'adminpassword123',
        role: 'admin'
    },
    {
        name: 'Demo User',
        email: 'user@macaalinka.com',
        password: 'userpassword123',
        role: 'user'
    }
];

const products = [
    {
        name: 'Macaalinka Home Jersey 24/25',
        subtitle: 'Pro Edition Match Kit',
        sku: 'MK-24H-RED',
        category: 'men',
        price: 85.00,
        description: 'The official 2024/25 Macaalinka Sportswear home jersey. Built with sweat-wicking PerformanceDry technology and a tapered fit for peak on-field performance.',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff', 'https://images.unsplash.com/photo-1511746315587-9f173c2b43b7'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 120,
        isNew: true
    },
    {
        name: 'Training Elite Shorts',
        subtitle: 'Lightweight Performance Gear',
        sku: 'MK-SH-BLK',
        category: 'men',
        price: 35.00,
        description: 'Engineered for intensity. These training shorts feature ventilated mesh panels and a 4-way stretch fabric that moves with you.',
        images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 85,
        isNew: false
    },
    {
        name: 'Women\'s Power Training Tee',
        subtitle: 'Seamless Comfort',
        sku: 'MK-WT-PUR',
        category: 'women',
        price: 45.00,
        description: 'Stay focused with our seamless training tee. Ultra-soft, lightweight, and breathable mesh zones provide maximum airflow during high-impact workouts.',
        images: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2'],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 60,
        isNew: true
    },
    {
        name: 'Kids\' Future Star Mini Kit',
        subtitle: 'Complete 3-Piece Set',
        sku: 'MK-KID-KIT',
        category: 'kids',
        price: 55.00,
        description: 'For the next generation of champions. Includes jersey, shorts, and socks. Soft, skin-friendly fabric designed for active play.',
        images: ['https://images.unsplash.com/photo-1519340241574-2cec6aef0c01'],
        sizes: ['S', 'M', 'L'],
        stock: 40,
        isNew: false
    },
    {
        name: 'Pro Compression Baselayer',
        subtitle: 'Second-Skin Support',
        sku: 'MK-BL-WHT',
        category: 'men',
        price: 40.00,
        description: 'A tight, supportive fit to keep your muscles warm and stable. Moisture-wicking technology pulls sweat away from the body.',
        images: ['https://images.unsplash.com/photo-1517438322351-177bf99d9b6e'],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 15,
        isNew: false
    }
];

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create(users);
        const createdProducts = await Product.create(products);

        const adminUser = createdUsers[0]._id;
        const demoUser = createdUsers[1]._id;

        const sampleOrders = [];
        const statuses = ['delivered', 'processing', 'pending', 'cancelled'];

        // Generate 20 random orders
        for (let i = 0; i < 20; i++) {
            // Randomly select 1-3 products
            const numItems = Math.floor(Math.random() * 3) + 1;
            const orderItems = [];
            let subtotal = 0;

            for (let j = 0; j < numItems; j++) {
                const product = createdProducts[Math.floor(Math.random() * createdProducts.length)];
                const quantity = Math.floor(Math.random() * 2) + 1;
                const itemTotal = product.price * quantity;

                orderItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.images[0],
                    size: product.sizes[0] // Default size
                });
                subtotal += itemTotal;
            }

            const tax = subtotal * 0.1;
            const shipping = subtotal > 100 ? 0 : 10;
            const total = subtotal + tax + shipping;

            // Random date within last 30 days
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));

            sampleOrders.push({
                user: demoUser,
                items: orderItems,
                shippingAddress: {
                    fullName: 'Demo User',
                    street: '123 Sport St',
                    city: 'Fit City',
                    state: 'Gym State',
                    zip: '12345'
                },
                paymentMethod: 'card',
                subtotal,
                tax,
                shipping,
                total,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                createdAt: date
            });
        }

        await Order.create(sampleOrders);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
