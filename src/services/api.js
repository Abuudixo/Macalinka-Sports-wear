import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

// Auth API
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data)
};

// Products API
export const productsAPI = {
    getAll: (params = {}) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    create: (productData) => {
        // Handle FormData for file uploads
        return axios.post(`${API_BASE_URL}/products`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    update: (id, productData) => {
        return axios.put(`${API_BASE_URL}/products/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    delete: (id) => api.delete(`/products/${id}`)
};

// Cart API
export const cartAPI = {
    get: () => api.get('/cart'),
    addItem: (productId, quantity = 1, size) => api.post('/cart', { productId, quantity, size }),
    updateItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
    removeItem: (itemId) => api.delete(`/cart/${itemId}`),
    clear: () => api.delete('/cart')
};

// Orders API
export const ordersAPI = {
    create: (orderData) => api.post('/orders', orderData),
    getAll: () => api.get('/orders'),
    getById: (id) => api.get(`/orders/${id}`)
};

// Addresses API
export const addressesAPI = {
    getAll: () => api.get('/addresses'),
    add: (addressData) => api.post('/addresses', addressData),
    update: (id, addressData) => api.put(`/addresses/${id}`, addressData),
    delete: (id) => api.delete(`/addresses/${id}`)
};

// Contact API
export const contactAPI = {
    submit: (data) => api.post('/contact', data)
};

// Admin API
export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getAnalytics: () => api.get('/admin/analytics'),
    getCustomers: () => api.get('/admin/customers'),
    getOrders: () => api.get('/admin/orders'),
    updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};

export default api;
