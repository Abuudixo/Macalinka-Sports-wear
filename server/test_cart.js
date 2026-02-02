const axios = require('axios');

async function testCart() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'user@macaalinka.com',
            password: 'userpassword123'
        });

        const token = loginRes.data.token;
        console.log('Login successful. Token obtained.');

        console.log('2. Fetching products...');
        const productsRes = await axios.get('http://localhost:5000/api/products');
        const productId = productsRes.data.data[0]._id;
        console.log(`Using product ID: ${productId}`);

        console.log('3. Adding to cart...');
        try {
            const cartRes = await axios.post('http://localhost:5000/api/cart',
                { productId, quantity: 1, size: 'M' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Add to cart SUCCESS:', JSON.stringify(cartRes.data, null, 2));
        } catch (err) {
            console.error('Add to cart FAILED!');
            if (err.response) {
                console.error('Status:', err.response.status);
                console.error('Body:', JSON.stringify(err.response.data, null, 2));
            } else {
                console.error('Error:', err.message);
            }
        }
    } catch (err) {
        console.error('Test script error:', err.message);
        if (err.response) console.error('Body:', err.response.data);
    }
}

testCart();
