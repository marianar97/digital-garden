from datetime import datetime
from typing import Dict, List, Any, Optional
from .firebase_config import db

COLLECTION_NAME = 'resources'

class FirestoreService:
    @staticmethod
    def create_resource(resource_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new resource in Firestore"""
        timestamp = datetime.now()
        doc_ref = db.collection(COLLECTION_NAME).document()
        
        new_resource = {
            **resource_data,
            'id': doc_ref.id,
            'createdAt': timestamp,
            'updatedAt': timestamp
        }
        
        doc_ref.set(new_resource)
        return new_resource
    
    @staticmethod
    def get_all_resources() -> List[Dict[str, Any]]:
        """Get all resources from Firestore"""
        docs = db.collection(COLLECTION_NAME).stream()
        return [doc.to_dict() for doc in docs if doc.exists]