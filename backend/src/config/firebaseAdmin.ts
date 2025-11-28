import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

import path from 'path';

if (!admin.apps.length) {
    try {
        // Explicitly load the service account to avoid path resolution issues
        const serviceAccountPath = path.resolve(__dirname, '../../firebase-service-account.json');

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccountPath),
        });
        console.log('🔥 Firebase Admin initialized with service account:', serviceAccountPath);
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
    }
}

export default admin;
