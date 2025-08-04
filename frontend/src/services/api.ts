const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResource {
  id: string;
  title: string;
  type: 'Video' | 'Article' | 'Book' | 'Tool';
  url: string;
  description?: string;
  image?: string;
  tags?: string[]; // Add this line
  createdAt: Date;
  updatedAt: Date;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getResources(): Promise<ApiResource[]> {
    return this.request<ApiResource[]>('/api/resources');
  }

  async createResource(data: {
    title: string;
    type: 'Video' | 'Article' | 'Book' | 'Tool';
    url: string;
    tags?: string[];
  }): Promise<ApiResource> {
    const response = await this.request<{ message: string; resource: ApiResource }>('/api/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.resource;
  }
}

export const apiService = new ApiService();