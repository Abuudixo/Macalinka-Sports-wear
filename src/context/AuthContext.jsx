import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authAPI.getMe();
                    setUser(response.data);
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authAPI.login(email, password);
            localStorage.setItem('token', response.token);
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authAPI.register(data);
            localStorage.setItem('token', response.token);
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const updateUser = async (updatedData) => {
        try {
            const response = await authAPI.updateProfile(updatedData);
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            updateUser,
            loading,
            error,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};
