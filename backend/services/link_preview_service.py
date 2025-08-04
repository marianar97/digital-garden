import os
import requests
from typing import Dict, Optional

class LinkPreviewService:
    API_URL = 'https://api.linkpreview.net'
    
    @staticmethod
    def get_preview(url: str) -> Dict[str, Optional[str]]:
        """Get link preview data from linkpreview.net API"""
        api_key = os.getenv('LINKPREVIEW_API_KEY')
        
        if not api_key:
            raise ValueError('LINKPREVIEW_API_KEY environment variable is not set')
        
        try:
            response = requests.get(
                LinkPreviewService.API_URL,
                params={'q': url},
                headers={'X-Linkpreview-Api-Key': api_key},
                timeout=10
            )
            response.raise_for_status()
            
            data = response.json()
            print(f'Link preview response: {data}')
            
            return {
                'title': data.get('title'),
                'description': data.get('description'),
                'image': data.get('image'),
                'url': data.get('url')
            }
            
        except requests.exceptions.RequestException as e:
            print(f'Error fetching link preview: {str(e)}')
            
            if hasattr(e, 'response') and e.response is not None:
                if e.response.status_code in [401, 403]:
                    print('LinkPreview API authentication failed - check API key in .env file')
                elif e.response.status_code == 429:
                    print('LinkPreview API rate limit exceeded')
                else:
                    print(f'LinkPreview API error: {e.response.status_code}')
            
            # Return empty dict to avoid undefined values in Firestore
            return {}
        except Exception as e:
            print(f'Unexpected error in link preview: {str(e)}')
            return {}