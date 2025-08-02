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
        if (error.response?.status === 401) {
          throw new Error('Invalid LinkPreview API key');
        }
        if (error.response?.status === 429) {
          throw new Error('LinkPreview API rate limit exceeded');
        }
      }
      
      return {
        title: undefined,
        description: undefined,
        image: undefined,
        url: url
      };
    }
  }
}