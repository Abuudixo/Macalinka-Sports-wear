import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        setLoading(true);
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    email,
                    name: email.split('@')[0],
                    role: 'user'
                };
                setUser(mockUser);
                setLoading(false);
                resolve(mockUser);
            }, 1000);
        });
    };

    const signup = async (data) => {
        setLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = {
                    id: Math.random().toString(36).substr(2, 9),
                    ...data,
                    role: 'user'
                };
                setUser(newUser);
                setLoading(false);
                resolve(newUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
