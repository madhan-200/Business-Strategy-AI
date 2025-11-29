import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// Helper function to translate Firebase errors to user-friendly messages
const getAuthErrorMessage = (error: any): string => {
    const errorCode = error?.code || '';

    switch (errorCode) {
        case 'auth/unauthorized-domain':
            return 'This domain is not authorized for Google Sign-In. Please contact support or use email/password login.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in cancelled. Please try again.';
        case 'auth/popup-blocked':
            return 'Pop-up blocked by browser. Please allow pop-ups and try again.';
        case 'auth/user-not-found':
            return 'No account found with this email. Please sign up first.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please login instead.';
        case 'auth/weak-password':
            return 'Password is too weak. Please use at least 6 characters.';
        case 'auth/invalid-email':
            return 'Invalid email address. Please check and try again.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        default:
            return error?.message || 'An error occurred. Please try again.';
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error));
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            throw new Error(getAuthErrorMessage(error));
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            throw new Error(getAuthErrorMessage(error));
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const value: AuthContextType = {
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
