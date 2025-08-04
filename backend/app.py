import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from urllib.parse import urlparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import our services
from services.firestore_service import FirestoreService
from services.link_preview_service import LinkPreviewService

app = Flask(__name__)

# Configure CORS - allow all origins for testing if FRONTEND_URL not set
frontend_url = os.getenv('FRONTEND_URL', '*')
CORS(app, origins=frontend_url, supports_credentials=True)

# Resource routes
@app.route('/api/resources', methods=['POST'])
def create_resource():
    try:
        data = request.get_json()
        
        # Extract data
        title = data.get('title')
        resource_type = data.get('type')
        url = data.get('url')
        tags = data.get('tags', [])
        
        # Basic validation
        if not title or not resource_type or not url:
            return jsonify({
                'error': 'Missing required fields: title, type, and url are required'
            }), 400
        
        # Validate tags if provided
        if tags and (not isinstance(tags, list) or not all(isinstance(tag, str) for tag in tags)):
            return jsonify({
                'error': 'Tags must be an array of strings'
            }), 400
        
        # Validate resource type
        valid_types = ['Video', 'Article', 'Book', 'Tool']
        if resource_type not in valid_types:
            return jsonify({
                'error': 'Invalid resource type. Must be one of: Video, Article, Book, Tool'
            }), 400
        
        # Validate URL format
        try:
            result = urlparse(url)
            if not all([result.scheme, result.netloc]):
                raise ValueError('Invalid URL')
        except Exception:
            return jsonify({
                'error': 'Invalid URL format'
            }), 400
        
        # Attempt to fetch link preview data (optional)
        preview_data = {}
        try:
            preview_data = LinkPreviewService.get_preview(url)
        except Exception as e:
            print(f'Link preview failed, continuing without preview data: {str(e)}')
        
        # Prepare resource data
        resource_data = {
            'title': title,
            'type': resource_type,
            'url': url,
            'tags': tags
        }
        
        # Only add description and image if they exist
        if preview_data.get('description'):
            resource_data['description'] = preview_data['description']
        if preview_data.get('image'):
            resource_data['image'] = preview_data['image']
        
        new_resource = FirestoreService.create_resource(resource_data)
        
        return jsonify({
            'message': 'Resource created successfully',
            'resource': new_resource
        }), 201
        
    except Exception as e:
        print(f'Error creating resource: {str(e)}')
        return jsonify({
            'error': 'Internal server error'
        }), 500

@app.route('/api/resources', methods=['GET'])
def get_resources():
    try:
        resources = FirestoreService.get_all_resources()
        return jsonify(resources)
    except Exception as e:
        print(f'Error fetching resources: {str(e)}')
        return jsonify({
            'error': 'Internal server error'
        }), 500

# Health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3001))
    app.run(host='0.0.0.0', port=port, debug=True)