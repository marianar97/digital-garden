import { db } from '../config/firebase.js';
import type { ResourceFormData, StoredResource } from '../types/index.js';

const COLLECTION_NAME = 'resources';

export class FirestoreService {
  static async createResource(resourceData: ResourceFormData & { description?: string; image?: string }): Promise<StoredResource> {
    const timestamp = new Date();
    const docRef = db.collection(COLLECTION_NAME).doc();
    
    const newResource: StoredResource = {
      ...resourceData,
      id: docRef.id,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    await docRef.set(newResource);
    return newResource;
  }

  static async getAllResources(): Promise<StoredResource[]> {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    return snapshot.docs.map((doc: any) => doc.data() as StoredResource);
  }
}