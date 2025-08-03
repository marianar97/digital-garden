import { initializeApp, cert } from 'firebase-admin/app';
import type { ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

  // Validate required environment variables
const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (!projectId || !privateKey || !clientEmail) {
  throw new Error('Missing required Firebase environment variables');
}

const serviceAccount: ServiceAccount = {
  projectId,
  privateKey,
  clientEmail,
};

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();