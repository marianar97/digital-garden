import axios from 'axios';

export interface LinkPreviewData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export class LinkPreviewService {
  private static readonly API_URL = 'https://api.linkpreview.net';
  private static readonly API_KEY = process.env.LINKPREVIEW_API_KEY;

  static async getPreview(url: string): Promise<LinkPreviewData> {
    if (!this.API_KEY) {
      throw new Error('LINKPREVIEW_API_KEY environment variable is not set');
    }
    console.log('API_KEY', this.API_KEY);

    try {
      const response = await axios.get(this.API_URL, {
        params: { q: url },
        headers: {
          'X-Linkpreview-Api-Key': this.API_KEY
        },
        timeout: 10000
      });

      return {
        title: response.data.title,
        description: response.data.description,
        image: response.data.image,
        url: response.data.url
      };
    } catch (error) {
      console.error('Error fetching link preview:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn('LinkPreview API authentication failed - check API key in .env file');
        } else if (error.response?.status === 429) {
          console.warn('LinkPreview API rate limit exceeded');
        } else {
          console.warn('LinkPreview API error:', error.response?.status, error.message);
        }
      }
      
      // Return empty object to avoid undefined values in Firestore
      return {};
    }
  }
}