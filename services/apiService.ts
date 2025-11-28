/// <reference types="vite/client" />
import { BusinessProfile, Strategy } from '../types';
import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeaders = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.error('getAuthHeaders: No user found');
        return {};
    }
    try {
        const token = await user.getIdToken();
        console.log('getAuthHeaders: Token retrieved', token.substring(0, 10) + '...');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    } catch (error) {
        console.error('getAuthHeaders: Error getting token', error);
        return {};
    }
};

export const apiService = {
    async generateStrategy(business: BusinessProfile): Promise<Strategy> {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/strategy/generate`, {
            method: 'POST',
            headers: headers as HeadersInit,
            body: JSON.stringify(business),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate strategy');
        }

        return response.json();
    },

    async getStrategy(id: string): Promise<Strategy> {
        const headers = await getAuthHeaders();
        // Remove Content-Type for GET request if strictly needed, but usually harmless.
        // However, fetch headers type needs care.
        const authHeaders = await getAuthHeaders();

        const response = await fetch(`${API_BASE_URL}/api/strategy/${id}`, {
            headers: {
                'Authorization': authHeaders['Authorization'] || ''
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch strategy');
        }

        return response.json();
    },

    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    },
};
