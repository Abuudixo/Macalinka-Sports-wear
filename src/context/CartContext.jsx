import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                // Filter out legacy mock data (numeric IDs)
                return parsed.filter(item => isNaN(item.id));
            } catch (e) {
                return [];
            }
        }
        return [];
    });
    const [loading, setLoading] = useState(false);

    // Sync cart with localStorage for non-authenticated users
    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    // Merge guest cart with server cart when user logs in
    useEffect(() => {
        const mergeCart = async () => {
            if (isAuthenticated && !loading) {
                const guestItems = JSON.parse(localStorage.getItem('cart') || '[]');

                if (guestItems.length > 0) {
                    console.log('Merging guest cart items...');
                    try {
                        // Add each guest item to the backend (filter mock data)
                        const realGuestItems = guestItems.filter(item => isNaN(item.id));
                        for (const item of realGuestItems) {
                            try {
                                await cartAPI.addItem(item.id, item.quantity, item.size);
                            } catch (e) {
                                console.warn(`Merge: Failed to add item ${item.id}`, e);
                            }
                        }
                        // Clear guest cart from storage
                        localStorage.removeItem('cart');
                        // Refresh final cart from server
                        fetchCart();
                    } catch (err) {
                        console.error('Failed to merge cart:', err);
                    }
                } else {
                    // Just fetch if no guest items
                    fetchCart();
                }
            }
        };

        const fetchCart = async () => {
            setLoading(true);
            try {
                const response = await cartAPI.get();
                if (response.data && response.data.items) {
                    const items = response.data.items
                        .filter(item => item.product)
                        .map(item => ({
                            id: item.product._id,
                            _cartItemId: item._id,
                            name: item.product.name,
                            price: item.product.price,
                            image: item.product.images?.[0] || item.product.image,
                            quantity: item.quantity,
                            size: item.size
                        }));
                    setCartItems(items);
                }
            } catch (err) {
                console.error('Failed to fetch cart:', err);
            }
            setLoading(false);
        };

        mergeCart();
    }, [isAuthenticated]);

    const addToCart = async (product, quantity = 1, size) => {
        if (isAuthenticated) {
            try {
                const response = await cartAPI.addItem(product.id || product._id, quantity, size);
                if (response.data && response.data.items) {
                    const items = response.data.items
                        .filter(item => item.product)
                        .map(item => ({
                            id: item.product._id,
                            _cartItemId: item._id,
                            name: item.product.name,
                            price: item.product.price,
                            image: item.product.images?.[0] || item.product.image,
                            quantity: parseInt(item.quantity) || 1,
                            size: item.size
                        }));
                    setCartItems(items);
                }
            } catch (err) {
                console.error('Failed to add to cart:', err);
            }
        } else {
            // Local cart for non-authenticated users
            setCartItems(prevItems => {
                const prodId = product._id || product.id;
                const existingItem = prevItems.find(item => item.id === prodId && item.size === size);

                if (existingItem) {
                    return prevItems.map(item =>
                        item.id === prodId && item.size === size
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }

                return [...prevItems, {
                    id: prodId,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || product.image,
                    category: product.category,
                    quantity,
                    size
                }];
            });
        }
    };

    const removeFromCart = async (id, cartItemId) => {
        if (isAuthenticated && cartItemId) {
            try {
                await cartAPI.removeItem(cartItemId);
                setCartItems(prevItems => prevItems.filter(item => item._cartItemId !== cartItemId));
            } catch (err) {
                console.error('Failed to remove from cart:', err);
            }
        } else {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        }
    };

    const updateQuantity = async (id, quantity, cartItemId) => {
        if (quantity < 1) return;

        if (isAuthenticated && cartItemId) {
            try {
                await cartAPI.updateItem(cartItemId, quantity);
                setCartItems(prevItems =>
                    prevItems.map(item =>
                        item._cartItemId === cartItemId ? { ...item, quantity } : item
                    )
                );
            } catch (err) {
                console.error('Failed to update quantity:', err);
            }
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = async () => {
        if (isAuthenticated) {
            try {
                await cartAPI.clear();
            } catch (err) {
                console.error('Failed to clear cart:', err);
            }
        }
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            loading
        }}>
            {children}
        </CartContext.Provider>
    );
};
