import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

  // Validate required environment variables
const projectId = process.env.FIREBASE_PROJECT_ID;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (!projectId || !privateKey || !clientEmail) {
  throw new Error('Missing required Firebase environment variables');
}

const serviceAccount: ServiceAccount = {
  projectId,
  privateKey: privateKey.replace(/\\n/g, '\n'),
  clientEmail,
};

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore();